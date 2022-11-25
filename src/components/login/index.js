import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Pressable, Text, TextInput, View} from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import useStyles from './styles';

const LoginScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);

  // console.log('CURRENT USER@@@!!!', auth().currentUser());

  const onLoginPress = async () => {
    if (email.trim() === '') {
      Alert.alert('Please enter your email.');
    } else if (password.trim() === '') {
      Alert.alert('Please enter password.');
    } else if (email.trim() === '' && password.trim() === '') {
      Alert.alert('Please enter your email and password.');
    } else {
      if (await login(email, password)) {
        console.log('login pressed');
        navigation.reset({
          index: 0,
          routes: [{name: 'MessageScreen'}],
        });
      } else {
        Alert.alert('Invalid credentials');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          placeholder="Enter Email"
          placeholderTextColor={'white'}
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          autoCapitalize={'none'}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={'white'}
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable style={styles.loginButton} onPress={onLoginPress}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
        <Pressable
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}>
          <Text style={styles.loginText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
