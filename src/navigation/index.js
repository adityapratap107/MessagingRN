import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import LoginScreen from '../components/login';
import MessageScreen from '../components/messageScreen';
import RegisterScreen from '../components/signup';
import {AuthContext} from './AuthProvider';
import auth from '@react-native-firebase/auth';
import updateProfile from '../components/updateProfile';
import UpdateProfile from '../components/updateProfile';

const Stack = createStackNavigator();

const Route = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'MessageScreen' : 'LoginScreen'}>
        <Stack.Screen
          name="MessageScreen"
          component={MessageScreen}
          options={{
            title: 'Chat Room',
            headerStyle: {backgroundColor: 'black'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: 'Login',
            headerStyle: {backgroundColor: 'black'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: 'Register',
            headerStyle: {backgroundColor: 'black'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="updateProfile"
          component={UpdateProfile}
          options={{
            title: 'UpdateProfile',
            headerStyle: {backgroundColor: 'black'},
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
