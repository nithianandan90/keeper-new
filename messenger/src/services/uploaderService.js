import { Alert } from 'react-native';
import {API, graphqlOperation, Auth, Storage} from 'aws-amplify';
import { createAttachment } from '../graphql/mutations';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';





    
    export const getFileInfo = async (fileURI) => {
        const fileInfo = await FileSystem.getInfoAsync(fileURI)
        return fileInfo
     }

    export const pickImage = async () => {
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
       
        return result;
      };
    
    
      export const pickDocument = async () => {
    
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
    
        
        return result;
      };


    export const addAttachment = async (file, taskID)=>{
    
        // console.log("file", file);
    
        // // const fileInfo = await getFileInfo(file?.uri);
    
        // console.log('file info', fileInfo);

        // if(fileInfo.size>25600000){
        //   Alert.alert('File size exceeds 25 mb')
        //   return;
        // }
    
        const types = {
          image: "IMAGE",
          video: "VIDEO",
          success: "DOCUMENT"
    
        }
        
        const fileType = file.uri.slice(file.uri.lastIndexOf('.') + 1);
    
        
      
        
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

 
        // Alert.alert('file uploaded')
      }
    
    
      export const addAttachmentProperty = async (file, propertiesID)=>{
    
        // console.log("file", file);
    
        // // const fileInfo = await getFileInfo(file?.uri);
    
        // console.log('file info', fileInfo);

        // if(fileInfo.size>25600000){
        //   Alert.alert('File size exceeds 25 mb')
        //   return;
        // }
    
        const types = {
          image: "IMAGE",
          video: "VIDEO",
          success: "DOCUMENT"
    
        }
        
        const fileType = file.uri.slice(file.uri.lastIndexOf('.') + 1);
    
        
      
        
        const newAttachment = {
          storageKey: await uploadFile(file.uri, fileType.toLowerCase()),
          fileName: file.name,
          type: types[file.type], 
          width: file.width,
          height: file.height,
          duration: file.duration, 
          propertiesID: propertiesID, 
          
        }
    
        
    
        const attachmentCreated = API.graphql(graphqlOperation(
          createAttachment, 
          {input: newAttachment}
        ))

 
        // Alert.alert('file uploaded')
      }


      export const uploadFile = async (fileUri, fileType) => {
          
    
        
        try {
            const response = await fetch(fileUri);
            const blob = await response.blob();
            const key = `${uuidv4()}.${fileType}`;
            await Storage.put(key, blob, {
              progressCallback(progress) {
             
            },
            });
            return key;
          } catch (err) {
            console.warn("Error uploading file:", err);
          }
        };
    



