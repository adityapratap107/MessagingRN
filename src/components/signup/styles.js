import {Platform, StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    },
    innerContainer: {
      marginTop: 40,
    },
    textInput: {
      borderRadius: 4,
      borderColor: 'white',
      height: 40,
      width: 200,
      paddingHorizontal: 12,
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: '#333436',
      color: 'white',
    },
    chooseView: {
      marginVertical: 16,
    },
    chooseText: {
      fontSize: 18,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      textAlign: 'center',
      color: '#D92E86',
    },
    registerButton: {
      backgroundColor: '#D92E86',
      borderRadius: 12,
      paddingVertical: 10,
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 12,
    },
    registerText: {
      color: 'white',
      fontWeight: '700',
    },
  });
};

export default useStyles;
