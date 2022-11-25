import {Platform, StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'black',
      justifyContent: 'center',
    },
    innerContainer: {
      marginTop: 40,
    },
    textInput: {
      borderColor: 'white',
      borderRadius: 4,
      height: 40,
      width: 200,
      paddingHorizontal: 12,
      marginTop: 20,
      marginBottom: 20,
      color: 'white',
      backgroundColor: '#333436',
    },
    loginButton: {
      backgroundColor: '#D92E86',
      borderRadius: 12,
      paddingVertical: 10,
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 12,
    },
    loginText: {
      color: 'white',
      fontWeight: '700',
    },
  });
};

export default useStyles;
