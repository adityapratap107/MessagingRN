import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const ChatModal = ({visible, onDeletePress, onBackdropPress, onBlockPress}) => {
  return (
    <View style={styles.centeredView}>
      <ReactNativeModal
        animationType="slide"
        transparent={true}
        isVisible={visible}
        onBackdropPress={onBackdropPress}>
        <View style={styles.modalView}>
          <Pressable onPress={onDeletePress}>
            <Text style={styles.modalText}>Delete Comment</Text>
          </Pressable>
          <Pressable onPress={onBlockPress}>
            <Text style={styles.modalText}>Block All Comments From User</Text>
          </Pressable>
        </View>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#696766',
    borderRadius: 12,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: widthPercentageToDP(80),
    height: 90,
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingLeft: 35,
  },
  modalText: {
    marginBottom: 10,
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ChatModal;
