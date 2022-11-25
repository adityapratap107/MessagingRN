import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import useStyles from './styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const RegisterScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [uploading, setUploading] = useState(false);

  const validation = () => {
    if (
      name.trim() === '' &&
      email.trim() === '' &&
      password.trim() === '' &&
      selectedImage.trim() === ''
    ) {
      Alert.alert('Please fill all the fields');
      return false;
    } else if (name.trim() === '') {
      Alert.alert('Please enter your name.');
      return false;
    } else if (email.trim() === '') {
      Alert.alert('Please enter email.');
      return false;
    } else if (password.trim() === '') {
      Alert.alert('Please enter password.');
      return false;
    } else {
      return true;
    }
  };

  const OnRegister = () => {
    if (validation()) {
      getUserRegister();
    }
  };

  const getUserRegister = async () => {
    let imageUrl = await uploadImage();
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('User registered successfully!', res.user);
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .set({
            _id: res.user.uid,
            displayName: name,
            email: email,
            password: password,
            photoUrl: imageUrl,
            isAdmin: true,
            isBlocked: false,
          })
          .then(() => {
            console.log('User Created on firestore!!!');
            navigation.navigate('LoginScreen');
          });
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          Alert.alert('Email already in use');
        } else if (err.code === 'auth/invalid-email') {
          Alert.alert('The email address is badly formatted');
        } else if (err.code === 'auth/weak-password') {
          Alert.alert('The given password is invalid.');
        }
      });
  };

  const uploadImage = async () => {
    if (selectedImage == null) {
      return null;
    }
    const uploadUri = selectedImage;

    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    setUploading(true);
    const storageRef = storage().ref(`profile/users/${filename}`);
    const task = storageRef.putFile(uploadUri);
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      // setSelectedImage(selectedImage);
      return url;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const profileImageHandler = async () => {
    try {
      const imageResponse = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      console.log('IMG RESP#', imageResponse);
      const imageUrl =
        Platform.OS === 'ios' ? imageResponse.sourceURL : imageResponse.path;
      setSelectedImage(imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          placeholder="Name"
          style={styles.textInput}
          placeholderTextColor={'white'}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Enter Email"
          style={styles.textInput}
          placeholderTextColor={'white'}
          autoCapitalize={'none'}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          placeholderTextColor={'white'}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable style={styles.chooseView} onPress={profileImageHandler}>
          <Text style={styles.chooseText}>Choose Photo</Text>
        </Pressable>
        <Pressable style={styles.registerButton} onPress={OnRegister}>
          <Text style={styles.registerText}>Register</Text>
        </Pressable>
        {uploading ? <ActivityIndicator size={'large'} /> : null}
      </View>
    </View>
  );
};

export default RegisterScreen;
