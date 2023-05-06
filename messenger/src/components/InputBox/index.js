import { useState } from 'react';
import { View, StyleSheet, TextInput, Image, FlatList } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {API, graphqlOperation, Auth, Storage} from 'aws-amplify';
import { createAttachment, createMessage, updateChatRoom } from '../../graphql/mutations';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const InputBox = ({chatroom}) => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true
    });


    if (!result.cancelled) {
      if(result.selected){
        //user selected multi
        setFiles(result.selected);
      }else{
        setFiles([result]);
      }
    }
  };


  const addAttachment = async (file, messageID)=>{
    
    const types = {
      image: "IMAGE",
      video: "VIDEO"
    }
    
    const newAttachment = {
      storageKey: await uploadFile(file.uri),
      type: types[file.type], //TODO videos
      width: file.width,
      height: file.height,
      duration: file.duration,
      messageID, 
      chatroomID: chatroom.id
    }

    
    console.log("new attachment", newAttachment);

    return API.graphql(graphqlOperation(
      createAttachment, 
      {input: newAttachment}
    ))

  }


  const uploadFile = async (fileUri) => {
	  try {
	    const response = await fetch(fileUri);
	    const blob = await response.blob();
	    const key = `${uuidv4()}.png`;
	    await Storage.put(key, blob, {
	      contentType: "image/png", // contentType is optional
	    });
	    return key;
	  } catch (err) {
	    console.log("Error uploading file:", err);
	  }
	};



  const onSend  = async () => {
    
    

    if(text || files){
      console.warn('Sending a new message: ', text);
      const authuser = await Auth.currentAuthenticatedUser();

      const newMessage = {
        chatroomID: chatroom?.id, 
        text, 
        userID: authuser.attributes.sub
      }

      
      // if(files.length >0) {
      //   newMessage.files= await Promise.all(files.map(uploadFile));
      //   setFiles([]);
      // }



      

      const newMessageData = await API.graphql(
        graphqlOperation(
          createMessage, {input: newMessage}
        )
      )

      setText('');

      //create attachments

      await Promise.all(files.map((file)=>addAttachment(file, newMessageData.data.createMessage.id)));

      setFiles([]);

      //set the new message as a LastMessage of the ChatRoom

          const object = {chatRoomLastMessageId: newMessageData.data.createMessage.id, _version: chatroom._version};
          
      await API.graphql(graphqlOperation(
        updateChatRoom, {input: {id: chatroom.id, chatRoomLastMessageId: newMessageData.data.createMessage.id, _version: chatroom._version} }
      ))

    }
  };

  return (
    <>

    {files?.length>0 && (
    
    <View style={styles.attachmentsContainer}>

      <FlatList
        data={files}
        horizontal
        renderItem={({item})=>(
          <>
          <Image source={{uri:item.uri}} style={styles.selectedImage} resizeMode='contain'/>
          <MaterialIcons
            name="highlight-remove"
            onPress={() => setFiles((existingfiles)=>existingfiles.filter((file)=>file!==item))}
            size={20}
            color="gray"
            style={styles.removeSelectedImage}
          />
          </>
        )}
      />

  


    </View>)}

    <SafeAreaView edges={['bottom']} style={styles.container}>
      {/* Icon */}
      <AntDesign onPress={pickImage} name="plus" size={20} color="royalblue" />
 
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
    </>
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
	attachmentsContainer: {
    alignItems: "flex-end",
  },
  selectedImage: {
    height: 100,
    width: 200,
    margin: 5,
  },
  removeSelectedImage: {
    position: "absolute",
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },

});

export default InputBox;
