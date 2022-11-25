import {useNavigation} from '@react-navigation/native';
import React from 'react';

const useOnFocus = (onFocus: () => void) => {
  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', onFocus);

    return unsubscribe;
  }, [navigation, onFocus]);
};

export default useOnFocus;
