import { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../graphql/mutations';

const InputBox = ({chatroom}) => {
  const [text, setText] = useState('');

  console.log("chat room", chatroom.id);
  const onSend  = async () => {
    
    console.warn('Sending a new message: ', text);

    const authuser = await Auth.currentAuthenticatedUser();

    const newMessage = {
      chatroomID: chatroom?.id, 
      text, 
      userID: authuser.attributes.sub
    }
    
    const newMessageData = await API.graphql(
      graphqlOperation(
        createMessage, {input: newMessage}
      )
    )

    setText('');

    //set the new message as a LastMessage of the ChatRoom

        const object = {chatRoomLastMessageId: newMessageData.data.createMessage.id, _version: chatroom._version};
        console.log('object', object);

    await API.graphql(graphqlOperation(
      updateChatRoom, {input: {id: chatroom.id, chatRoomLastMessageId: newMessageData.data.createMessage.id, _version: chatroom._version} }
    ))

  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {/* Icon */}
      <AntDesign name="plus" size={20} color="royalblue" />

      {/* Text Input */}
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="type your message..."
      />

      {/* Icon */}
      <MaterialIcons onPress={onSend} style={styles.send} name="send" size={16} color="white" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,

    borderRadius: 50,
    borderColor: 'lightgray',
    borderWidth: StyleSheet.hairlineWidth,
  },
  send: {
    backgroundColor: 'royalblue',
    padding: 7,
    borderRadius: 15,
    overflow: 'hidden',
  },
});

export default InputBox;
