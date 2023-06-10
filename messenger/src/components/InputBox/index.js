import { useState } from 'react';
import { View, StyleSheet, TextInput, Image, FlatList, Text, ActivityIndicator, Alert } from 'react-native';
import { AntDesign, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {API, graphqlOperation, Auth, Storage} from 'aws-amplify';
import { createAttachment, createMessage, updateChatRoom } from '../../graphql/mutations';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const InputBox = ({chatroom}) => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [progresses, setProgresses] = useState({});
  const [disableSend, setDisableSend] = useState(false);


  const getFileInfo = async (fileURI) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI)
    return fileInfo
 }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true
    });

    // const fileInfo = await getFileInfo(result.uri);

    // if(fileInfo.size>25600000){
    //   Alert.alert('File size exceeds 25 mb')
    //   return;
    // }

    // console.log("file info",await getFileInfo(result.uri));

    if (!result.cancelled) {
      if(result.selected){
        //user selected multi
        setFiles(result.selected);
      }else{
        setFiles([result]);
      }
    }
  };


  const pickDocument = async () => {

    // console.warn('pick document');

    let result = await DocumentPicker.getDocumentAsync({
      type: "application/*"
    });

    // console.log("result",result);

    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   quality: 1,
    //   allowsMultipleSelection: true
    // });


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
    
    console.log("file", file);

     const fileInfo = await getFileInfo(file.uri);

    if(fileInfo.size>25600000){
      Alert.alert('File size exceeds 25 mb')
      return;
    }
   
    const types = {
      image: "IMAGE",
      video: "VIDEO",
      success: "DOCUMENT"

    }
    
    const fileType = file.uri.slice(file.uri.lastIndexOf('.') + 1);

    console.log("fileType", fileType);

    const newAttachment = {
      storageKey: await uploadFile(file.uri, fileType.toLowerCase()),
      type: types[file.type], 
      width: file.width,
      height: file.height,
      duration: file.duration, 
      messageID, 
      chatroomID: chatroom.id
    }

    console.log("file attachment", newAttachment)
   

    return API.graphql(graphqlOperation(
      createAttachment, 
      {input: newAttachment}
    ))

  }


  const uploadFile = async (fileUri, fileType) => {
	  

    
    try {
	    const response = await fetch(fileUri);
	    const blob = await response.blob();
	    const key = `${uuidv4()}.${fileType}`;
	    await Storage.put(key, blob, {
	      progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          setProgresses(p=>({...p, [fileUri]: progress.loaded/progress.total}))
        },
	    });
	    return key;
	  } catch (err) {
	    console.log("Error uploading file:", err);
	  }
	};



  const onSend  = async () => {
    
    

    if(text || files.length>0){
      // console.warn('Sending a new message: ', files);
      setDisableSend(true);

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

          
      const chatRoomData = await API.graphql(graphqlOperation(
        updateChatRoom, {input: {id: chatroom.id, chatRoomLastMessageId: newMessageData.data.createMessage.id, _version: chatroom._version} }
      ))

      console.log("data",chatRoomData)
      setDisableSend(false);
    }
   
  };

  // console.log("files", files);
  return (
    <>

    {files?.length>0 && (
    
    <View style={styles.attachmentsContainer}>

      <FlatList
        data={files}
        horizontal
        renderItem={({item})=>(
          <>
          {item.type!=='success'?(<Image source={{uri:item.uri}} style={styles.selectedImage} resizeMode='contain'/>):(<Ionicons name="document-attach" size={70} color="gray" />)}
       
          <View style={{position: "absolute", top: "50%", left:"50%", backgroundColor:'gray'}}>
            <Text style={{color: 'white'}}>{progresses[item.uri]}%</Text>
          </View>
          
          {!disableSend&&  <MaterialIcons
            name="highlight-remove"
            onPress={() => setFiles((existingfiles)=>existingfiles.filter((file)=>file!==item))}
            size={20}
            color="gray"
            style={styles.removeSelectedImage}
          />}
        
          </>
        )}
      />

  


    </View>)}

    <SafeAreaView edges={['bottom']} style={styles.container}>
      {/* Icon */}
      <FontAwesome onPress={pickImage} name="photo" size={30} color="royalblue" style={{padding: 10}}/>
      <Ionicons onPress={pickDocument} name="document" size={30} color="royalblue" />
      
      {/* Text Input */}
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="type your message..."
      />

      {/* Icon */}
      {!disableSend?(  <MaterialIcons onPress={onSend} style={styles.send} name="send" size={16} color="white" />):(
        <ActivityIndicator size="large" color={'#512da8'}/>
      )}
    
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
