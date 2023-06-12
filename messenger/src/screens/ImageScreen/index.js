import React from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, Pressable } from 'react-native';
import { graphqlOperation, API, DataStore, Storage } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import ImageView from "react-native-image-viewing";
import {Video} from 'expo-av';
import { listAttachmentsByTask } from '../../graphql/queries';

const { width } = Dimensions.get('window');
const imageWidth = width / 3.5;

const images_sample = [
  { id: '1', source: {uri: ('https://knowpathology.com.au/wp-content/uploads/2018/07/happy-test-screen-825x510.jpg')} },
  { id: '2', source: {uri: ('https://knowpathology.com.au/wp-content/uploads/2018/07/happy-test-screen-825x510.jpg')} },
  { id: '3', source: {uri: ('https://knowpathology.com.au/wp-content/uploads/2018/07/happy-test-screen-825x510.jpg')} },
  { id: '4', source: {uri: ('https://knowpathology.com.au/wp-content/uploads/2018/07/happy-test-screen-825x510.jpg')} },
  // Add more images as needed
];

const images_sample_2 = {uri: ('https://knowpathology.com.au/wp-content/uploads/2018/07/happy-test-screen-825x510.jpg')} 
    
    
    // Add more images as needed
  

const GridScreen = () => {

    const route = useRoute();
    const task = route?.params?.task;

    const [visible, setIsVisible] = useState(false);
    const [images, setImages] = useState([]);
    const [imageSam, setImageSam] = useState([]);
    const [videoSam, setVideoSam] = useState();

    const getImages = async () =>{
      // const attachments = await DataStore.query(Attachment, (o)=>o.taskID.eq(task?.id));

      const result = await API.graphql(graphqlOperation(listAttachmentsByTask, {taskID: task.id, sortDirection:'DESC'}))

      const attachments = result.data.listAttachmentsByTask.items;

      
      const downloadedImages = await Promise.all(
          attachments.filter(attachment => attachment.type!=='DOCUMENT').map(async (attachment) =>
          
              {
              
                      return Storage.get(attachment.storageKey).then((uri) => ({
                            ...attachment,
                            uri, 
                          
                      }))
                  
              }
        
          
         
         
          )
        );


      
      setImages(downloadedImages);      
  

  }


  useEffect(()=>{
      getImages();

      
    },[visible])
  //add state variable to launch image and video viewer



  const renderItem = ({ item }) => {
    
    if (item.type==='VIDEO'){

        return(    <Video
            
            useNativeControls
            source={{
            uri: item.uri,
            }}
            shouldPlay={false}
            style={{
            width: 150,
            height:imageWidth
                
            }}
            resizeMode="contain"
        /> )
    }else{
    return (

    //check if photo or video, follow chat room
        <Pressable onPress={()=>{setImageSam([item]); setIsVisible(true)}}><Image source={item} style={styles.image} resizeMode="cover" /></Pressable>
      )
    }
};

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        
      />
    
    <ImageView
            images={imageSam}
            
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
            />


    </View>

    
    
    //add viewer for video and audio
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    margin: 5,
  },
});

export default GridScreen;
