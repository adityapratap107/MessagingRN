import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [checkUser, setCheckUser] = useState(false);
  const [registerData, setRegisterData] = useState({});

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        checkUser,
        setCheckUser,
        registerData,
        setRegisterData,
        login: async (email, password) => {
          try {
            const response = await auth().signInWithEmailAndPassword(
              email,
              password,
            );
            console.log('Login Data stored in async', response.user);
            await AsyncStorage.setItem('login', JSON.stringify(response.user));
            setUser(response.user);
            return true;
          } catch (e) {
            console.log(e);
            return false;
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
