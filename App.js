import React from 'react';
import {StatusBar} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import Route from './src/navigation';
import {AuthProvider} from './src/navigation/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <MenuProvider>
        <StatusBar barStyle={'light-content'} />
        <Route />
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;
