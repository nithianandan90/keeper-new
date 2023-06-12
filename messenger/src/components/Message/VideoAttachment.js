import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react';
import {Video} from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {shareAsync} from 'expo-sharing';
import { startActivityAsync } from 'expo-intent-launcher';
import * as mime from 'react-native-mime-types';


const VideoAttachment = ({width, attachments}) => {

  const [isLoading, setIsLoading] = useState(false);
  const save = async (url, uri, fileName, mimetype, headers)=>{
    

    const type = mime.lookup(uri);

    
    if(Platform.OS==='android'){

    let content = await FileSystem.getContentUriAsync(uri)

    await startActivityAsync('android.intent.action.VIEW', {
        data: content,
        flags: 1,
        type: type
     });

      // return WebBrowser.openBrowserAsync(url);

      // const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      // if(permissions.granted){
      //   const base64 = await FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.Base64});
      //   await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, mimetype).then(
      //     async (uri)=> {
      //       await FileSystem.writeAsStringAsync(uri, base64, {encoding: FileSystem.EncodingType.Base64}).catch(e=>console.log(e));
      //     }
      //   )
      // }else{
      //   shareAsync(uri)
      // }

    }else{
      shareAsync(uri);
 
    }
  }

  const downloadFile = async (url, fileName) => {
    
    setIsLoading(true);
    const result = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + fileName

    )
      
    setIsLoading(false);
    save(url, result.uri, fileName, result.headers["Content-Type"]);


  //   const fileUri = `${FileSystem.documentDirectory}/downloads/${fileName}`;
    
  //   const { status } = await MediaLibrary.requestPermissionsAsync();
  //   if (status === 'granted') {
  //     console.log('Storage permissions granted.');
  //   } else {
  //     console.log('Storage permissions denied.');
  //     return;
  //   }
    
  //   // await FileSystem.requestStoragePermissionsAsync();
  //   await FileSystem.makeDirectoryAsync(fileUri, { intermediates: true });



  // const downloadResumable = FileSystem.createDownloadResumable(
  //   url,
  //   fileUri
  // );  

  // try {
  //   const { uri } = await downloadResumable.downloadAsync();
  //   console.log('Downloaded file:', uri);
  // } catch (e) {
  //   console.error('Error downloading file:', e);
  // }

    
  }
  
  return (
    <>
    {attachments.map((attachment)=> 
    
      (    
    
       <View>
        <Video
        key={attachment.id}
        useNativeControls
        source={{
          uri: attachment.uri,
        }}
        shouldPlay={false}
        style={{
          width,
          height:
            (attachment.height * width) /
            attachment.width,
        }}
        resizeMode="contain"
      /> 
      {!isLoading?(<FontAwesome name='cloud-download' style={{marginTop: 10}} size={24} color='gray' onPress={()=>downloadFile(attachment.uri, attachment.storageKey)}/>):
      (<ActivityIndicator size={'large'} color={'#512da8'}/>)}
      </View>
      )
      
      
      )}
    
 
    </>
      
  )
}

export default VideoAttachment

const styles = StyleSheet.create({})