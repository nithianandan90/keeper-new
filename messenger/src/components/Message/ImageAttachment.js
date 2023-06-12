import { ActivityIndicator, Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native'
import React, { useState } from 'react'
import ImageView from 'react-native-image-viewing';
import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import {shareAsync} from 'expo-sharing';
import { startActivityAsync } from 'expo-intent-launcher';
import * as mime from 'react-native-mime-types';

const ImageAttachment = ({attachments}) => {
  
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


  
  const [imageViewVisible, setImageViewVisible] = useState(false);
  return (
  <>  
    {attachments.map((attachment)=>(  
    <View>
    <Pressable 
      key={attachment.id}
      style={[ styles.imageContainer, 
      attachments.length===1 && {width: '100%'}]} 
      onPress={()=>{
        
        if(attachment.type!=='DOCUMENT'){
        setImageViewVisible(true)
        }
        

        // console.log(attachment);

        }}>
      
      {attachment.type!=='DOCUMENT'?(<Image source={{uri: attachment.uri}} style={styles.image} />):(<Image source={require('../../../assets/document.png')} style={styles.document} />)}
      
    </Pressable>
    {!isLoading?(<FontAwesome name='cloud-download' size={24} color='gray' onPress={()=>downloadFile(attachment.uri, attachment.storageKey)}/>):
    (<ActivityIndicator size={'large'} color={'#512da8'}/>)}

    </View>
      ))}
    
    
    <ImageView 
    images={attachments.map(({uri})=>({uri}))} 
    imageIndex={0} 
    visible={imageViewVisible} 
    onRequestClose={()=>setImageViewVisible(false)}/>
 
  

  </>
  )
}

export default ImageAttachment

const styles = StyleSheet.create({

  imageContainer: {
    padding: 3,
    width: '50%',
    aspectRatio: 1
    
  },

  image: {
    flex: 1,
    height: 100,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
  },
  document: {
    
    alignSelf: 'center',
    marginTop: 50,
    width: '50%',
    height: '50%',
    padding: 100,
    borderRadius: 5,
  },

})