import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react';
import { Pressable, View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import {API, graphqlOperation, Storage} from 'aws-amplify';
import { createAttachment } from '../../graphql/mutations';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';



const Uploader = ({taskID}) => {

    const [progresses, setProgresses] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    
    const getFileInfo = async (fileURI) => {
        const fileInfo = await FileSystem.getInfoAsync(fileURI)
        return fileInfo
     }

     const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          quality: 1,
          allowsMultipleSelection: false
        });
    
        // const fileInfo = await getFileInfo(result.uri);
    
        // if(fileInfo.size>25600000){
        //   Alert.alert('File size exceeds 25 mb')
        //   return;
        // }
    
        // console.log("file info",await getFileInfo(result.uri));
    
        if (!result.cancelled) {
            addAttachment(result, taskID);
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
          addAttachment(result, taskID);
        }
      };


    const addAttachment = async (file, taskID)=>{
    
        
        const fileInfo = await getFileInfo(file?.uri);
    
        
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
    
        
        setIsLoading(true);
        
        const newAttachment = {
          storageKey: await uploadFile(file.uri, fileType.toLowerCase()),
          fileName: file.name,
          type: types[file.type], 
          width: file.width,
          height: file.height,
          duration: file.duration, 
          taskID: taskID, 
          
        }
    
        
    
        const attachmentCreated = API.graphql(graphqlOperation(
          createAttachment, 
          {input: newAttachment}
        ))

        setIsLoading(false);    
        Alert.alert('file uploaded')
      }
    
    
      const uploadFile = async (fileUri, fileType) => {
          
    
        
        try {
            const response = await fetch(fileUri);
            const blob = await response.blob();
            const key = `${uuidv4()}.${fileType}`;
            await Storage.put(key, blob, {
              progressCallback(progress) {
              setProgresses(p=>({...p, [fileUri]: progress.loaded/progress.total}))
            },
            });
            return key;
          } catch (err) {
            console.warn("Error uploading file:", err);
          }
        };
    
if(isLoading){
    return <ActivityIndicator size={'large'} color={'#512da8'} />
}        


return (

    
    <View style={{flexDirection:'row', marginBottom: 10}}>    
        <Pressable style={{flex:1, flexDirection:'row', alignItems: 'center'}} onPress={pickDocument}>
            <Ionicons  name="ios-document-attach-outline" size={34} color="blue" />
            <Text style={{color:"blue"}}>Add Files</Text>
        </Pressable>
        <Pressable style={{flex:1, flexDirection:'row', alignItems: 'center'}} onPress={pickImage}>
            <MaterialCommunityIcons  name="image-plus" size={34} color="blue" />
            <Text style={{color:"blue"}}>Add Images</Text>
        </Pressable>
    </View>
  )
}

export default Uploader

const styles = StyleSheet.create({})    