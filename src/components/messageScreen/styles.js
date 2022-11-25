import {Platform, StyleSheet, Dimensions} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const {height, width} = Dimensions.get('screen');
const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    logoutText: {
      color: 'white',
      marginRight: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    headerView: {
      marginTop: 20,
      left: 15,
      flexDirection: 'row',
    },
    headerText: {
      fontSize: 24,
      color: 'white',
      fontWeight: 'bold',
    },
    endChatView: {
      backgroundColor: '#FF6347',
      borderRadius: 6,
      justifyContent: 'center',
      left: widthPercentageToDP(26),
      padding: 8,
      height: 35,
    },
    endChatText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    crossView: {
      flex: 1,
      alignItems: 'flex-end',
      right: widthPercentageToDP(8),
    },
    crossText: {
      fontSize: 30,
      color: 'white',
      fontWeight: '600',
    },
    line: {
      backgroundColor: '#595c5a',
      height: 2,
      width: '100%',
      marginTop: 20,
    },
    emptyChatView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{scaleY: -1}],
    },
    chatFooterView: {
      justifyContent: 'center',
      alignItems: 'center',
      top: 30,
    },
    chatFooterText: {
      fontSize: 16,
      padding: 12,
      color: 'grey',
    },
    inputToolbarView: {
      // flex: 1,
      height: 105,
    },
    inputToolbar: {
      height: 100,
      backgroundColor: '#1C1C1C',
      paddingLeft: 12,
    },
    sendView: {
      height: Platform.OS === 'android' ? 60 : 65,
      width: 60,
    },
    sendContainer: {
      top: 15,
    },
    sendText: {
      color: '#D92E86',
    },
    messagesConatiner: {
      backgroundColor: 'black',
    },
    textInput: {
      color: '#dcdedc',
      fontSize: 17,
      paddingEnd: 10,
      paddingVertical: 0,
    },
    dotView: {
      bottom: 5,
      left: 35,
    },
    customView: {
      alignItems: 'center',
    },
    customViewText: {
      color: 'white',
      fontWeight: '800',
      fontSize: 25,
    },
    avatarViewMessage: {
      flexDirection: 'row',
    },
    renderMessageTextView: {
      flexDirection: 'row',
      right: 5,
    },
    textView: {
      width: widthPercentageToDP(70),
      top: 4,
    },
    userNameText: {
      color: 'darkgrey',
      fontSize: 17,
      fontWeight: '600',
    },
    messageText: {
      fontSize: 16,
      color: 'white',
      paddingLeft: 5,
    },
    avatarView: {
      height: 50,
      width: 50,
    },
    adminView: {
      backgroundColor: '#D92E86',
      borderRadius: 6,
      padding: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    adminText: {
      color: 'white',
      fontSize: 15,
      fontWeight: '500',
    },
    centeredView: {
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      backgroundColor: '#696766',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: widthPercentageToDP(74),
      height: 95,
      paddingVertical: 12,
      paddingLeft: 10,
    },
    modalText: {
      marginBottom: 10,
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
      left: 10,
    },
  });
};

export default useStyles;
