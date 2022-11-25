import React, { useContext } from 'react';
import {Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthProvider';

const UpdateProfile = () => {
  const {user} = useContext(AuthContext);

  

  return (
    <View>
      <Text>Edit Profile</Text>
    </View>
  );
};

export default UpdateProfile;
