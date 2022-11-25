import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useLayoutEffect,
} from 'react';
import {View, Pressable, Text, SafeAreaView, Platform} from 'react-native';
import {
  Avatar,
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Message,
  Send,
} from 'react-native-gifted-chat';
import {AuthContext} from '../../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import useStyles from './styles';
import ChatModal from '../common/ChatModal';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

const MessageScreen = ({navigation}) => {
  const styles = useStyles();
  const [messages, setMessages] = useState([]);
  const {user} = useContext(AuthContext);
  const [info, setInfo] = useState(user);
  const {logout} = useContext(AuthContext);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [documentId, setDocumentId] = useState(-1);
  const [userData, setUserData] = useState({});
  const [userName, setUserName] = useState([]);
  const [block, setBlock] = useState(false);
  const [nameAdmin, setNameAdmin] = useState(false);
  const [adminId, setAdminId] = useState(null);

  // for logout button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            onPress={async () => {
              logout();
              navigation.reset({
                index: 0,
                routes: [{name: 'LoginScreen'}],
              });
            }}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        );
      },
    });
  });

  useEffect(() => {
    firestore()
      .collection('users')
      .onSnapshot(response => {
        response.forEach(docs => {
          if (docs.data().isAdmin) {
            // console.log('USER ADMIN', docs.data());
            setAdminId(docs.data()._id);
            // setNameAdmin(true);
          }
        });
      });
  }, []);

  // get current user details from users collection i.e name and avatar
  useEffect(() => {
    try {
      firestore()
        .collection('users')
        .where('_id', '==', user.uid)
        .onSnapshot(response => {
          response.forEach(docs => {
            setUserData(docs.data());
          });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  // for details of all users from firestore - users collection
  useEffect(() => {
    firestore()
      .collection('users')
      .where('_id', '==', info?.uid)
      .onSnapshot(documentSnapshot => {
        documentSnapshot.forEach(docs => {
          setIsAdmin(docs.data().isAdmin);
          setDocumentId(docs.id);
          setIsBlocked(docs.data().isBlocked);
        });
      });
  }, [info.uid]);

  // fetch messages from firestore
  useEffect(() => {
    const messageRef = firestore()
      .collection('chatroom')
      .orderBy('createdAt', 'desc');
    const unSubscribe = messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap.docs.map(docSnap => {
        const data = docSnap.data();
        if (!data.createdAt) {
          return {
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt,
          };
        } else {
          return {
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate(),
          };
        }
      });
      setMessages(allmsg);
    });
    return () => {
      unSubscribe();
    };
  }, [isAdmin, userName]);

  // when user send message
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const msg = messages[0];
    const mymsg = {
      ...msg,
      sentBy: user.uid,
      createdAt: new Date(),
    };
    firestore()
      .collection('chatroom')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()})
      .then(() => {
        // message sent
      });
  }, []);

  // const updateUserProfile = async () => {
  //   let profile = userData?.photoUrl;
  //   let user = user.avatar;
  //   let id = messages[0].user._id;
  //   console.log('id', id);
  //   await firestore()
  //     .collection('chatroom')
  //     .doc(id)
  //     .update({
  //       // user.avatar :  userData?.photoUrl,
  //     })
  //     .then(() => {
  //       console.log('updated');
  //     });
  // };

  // if there is no messages
  const renderChatEmpty = () => {
    return (
      <View style={styles.emptyChatView}>
        <Text>No messages available!!</Text>
      </View>
    );
  };

  // if user is blocked
  const renderChatFooter = () => {
    return (
      <View style={styles.chatFooterView}>
        {isBlocked ? (
          <Text style={styles.chatFooterText}>
            You can't reply to this group conversation
          </Text>
        ) : null}
      </View>
    );
  };

  const onBlockPress = async uid => {
    setModalVisible(false);
    // setIsBlocked(isBlocked);
    setBlock(block);
    await firestore()
      .collection('users')
      .doc(uid)
      // .update({isBlocked: !isBlocked})
      .update({isBlocked: !block})
      .then(() => {
        console.log('blocked');
      });
  };

  const onCommentDelete = id => {
    // setModalVisible(false);
    firestore()
      .collection('chatroom')
      .onSnapshot(documentSnapshot => {
        documentSnapshot.forEach(docs => {
          if (docs.data()._id === id) {
            console.log('deleted');
            firestore()
              .collection('chatroom')
              .doc(docs.id)
              .delete()
              .then(() => {
                // message deleted
                // console.log('Message deleted!');
              });
          }
        });
      });
  };

  function capitalize(input) {
    let words = input.split(' ');
    if (words.length > 1) {
      let capitalWord = [];
      words.forEach(element => {
        capitalWord.push(
          element[0]?.toUpperCase() + element.slice(1, element.length),
        );
      });
      capitalWord[capitalWord.length - 1] = `${capitalWord[
        capitalWord.length - 1
      ].substring(0, 1)}.`;
      return capitalWord.join(' ');
    } else {
      let name = words[0];
      return name[0].toUpperCase() + name.substring(1, name.length);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>LIVE CHAT</Text>
        {isAdmin ? (
          <Pressable style={styles.endChatView}>
            <Text style={styles.endChatText}>End Chat</Text>
          </Pressable>
        ) : null}
        <Pressable style={styles.crossView}>
          <Text style={styles.crossText}>X</Text>
        </Pressable>
      </View>
      <View style={styles.line} />
      {/* <ChatModal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        onDeletePress={onCommentDelete}
        onBlockPress={onBlockPress}
      /> */}

      <SafeAreaView edges={['right', 'bottom', 'left']} style={{}} />
      <GiftedChat
        wrapInSafeArea={false}
        messages={messages}
        renderTime={() => {
          return null;
        }}
        renderDay={() => {
          return null;
        }}
        onSend={messages => {
          if (!isBlocked) {
            onSend(messages);
          }
        }}
        disableComposer={isBlocked ? true : false}
        scrollToBottom
        user={{
          _id: info?.uid,
          avatar: userData?.photoUrl ? userData?.photoUrl : '',
          name: userData?.displayName,
        }}
        renderBubble={props => {
          return (
            <>
              <Bubble
                {...props}
                position={'left'}
                wrapperStyle={{
                  left: {
                    marginTop: 14,
                    top: 5,
                    right: 10,
                    padding: 4,
                    backgroundColor: 'black',
                    // backgroundColor: 'tomato',
                  },
                }}
              />
            </>
          );
        }}
        renderChatEmpty={renderChatEmpty}
        renderChatFooter={renderChatFooter}
        messagesContainerStyle={styles.messagesConatiner}
        renderUsernameOnMessage={false}
        minInputToolbarHeight={80}
        maxInputLength={250}
        // minComposerHeight={45}
        minComposerHeight={Platform.OS === 'android' ? 50 : 45}
        // bottomOffset={-14}
        placeholder={'Type here...'}
        textInputStyle={styles.textInput}
        renderComposer={props => {
          return (
            <Composer
              {...props}
              textInputProps={{autoCorrect: false, spellCheck: false}}
            />
          );
        }}
        showAvatarForEveryMessage={true}
        showUserAvatar={true}
        keyboardShouldPersistTaps="never"
        renderInputToolbar={props => {
          return !isBlocked ? (
            <View style={styles.inputToolbarView}>
              <InputToolbar
                {...props}
                containerStyle={styles.inputToolbar}
                primaryStyle={{}}
              />
            </View>
          ) : null;
        }}
        renderSend={props => {
          return (
            <View style={styles.sendView}>
              <Send
                {...props}
                label="Send"
                alwaysShowSend={false}
                textStyle={styles.sendText}
                containerStyle={styles.sendContainer}
              />
            </View>
          );
        }}
        renderMessage={props => {
          return (
            <Message
              {...props}
              containerStyle={{
                right: {
                  left: 65,
                  bottom: 18,
                },
                left: {
                  bottom: 18,
                },
              }}
            />
          );
        }}
        renderMessageText={() => {
          return null;
        }}
        renderAvatar={props => {
          return (
            <View style={styles.avatarView}>
              <Avatar
                {...props}
                imageStyle={{
                  left: {
                    right: 48,
                    height: 30,
                    width: 30,
                  },
                }}
              />
            </View>
          );
        }}
        renderCustomView={props => {
          // console.log('Custom view props', props);
          // firestore()
          //   .collection('users')
          //   // .where('isAdmin', '==', true)
          //   .onSnapshot(response => {
          //     response.forEach(docs => {
          //       if (docs.data().isAdmin === true) {
          //         console.log('USER ADMIN', docs.data());
          //       //   setNameAdmin(true);
          //       }
          //       // else {
          //       //   setNameAdmin(false);
          //       // }
          //       // if(docs)
          //     });
          //   });
          return (
            <>
              <View style={styles.avatarViewMessage}>
                <Avatar
                  {...props}
                  containerStyle={{
                    left: {
                      height: 0,
                    },
                  }}
                />
              </View>
              <View style={styles.renderMessageTextView}>
                <View style={styles.textView}>
                  {!nameAdmin ? (
                    <Text style={styles.userNameText}>
                      {capitalize(props.currentMessage.user.name)}{' '}
                      <Text style={styles.messageText}>
                        {props.currentMessage.text}
                      </Text>
                    </Text>
                  ) : (
                    <Text style={[styles.userNameText, {color: '#D92E86'}]}>
                      {capitalize(props.currentMessage.user.name)}{' '}
                      <View style={styles.adminView}>
                        <Text style={styles.adminText}>Admin</Text>
                      </View>
                      <Text style={styles.messageText}>
                        {' '}
                        {props.currentMessage.text}
                      </Text>
                    </Text>
                  )}
                </View>
                {/* <View style={styles.dotView}>
                  {isAdmin ? (
                    <TouchableOpacity
                      style={styles.customView}
                      onPress={() => {
                        setModalVisible(true);
                        setMessageId(props.currentMessage._id);
                        setUserId(props.currentMessage.user._id);
                      }}>
                      <Text style={styles.customViewText}>:</Text>
                    </TouchableOpacity>
                  ) : null}
                </View> */}
                <Menu>
                  {isAdmin ? (
                    <MenuTrigger
                      style={styles.dotView}
                      onPress={() => {
                        // setUserId(props.currentMessage.user._id);
                      }}>
                      <Text style={styles.customViewText}>:</Text>
                    </MenuTrigger>
                  ) : null}
                  <MenuOptions
                    optionsContainerStyle={styles.modalView}
                    customStyles={{
                      optionsContainer: {
                        marginLeft: 20,
                      },
                    }}>
                    <MenuOption
                      onSelect={() => {
                        onCommentDelete(props.currentMessage._id);
                      }}>
                      <Text style={styles.modalText}>Delete Comment</Text>
                    </MenuOption>
                    {/* <MenuOption onSelect={onBlockPress}> */}
                    <MenuOption
                      onSelect={() => {
                        onBlockPress(props.currentMessage.user._id);
                      }}>
                      <Text style={styles.modalText}>
                        Block All Comments From User
                      </Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

export default MessageScreen;
