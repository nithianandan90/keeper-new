import { useEffect, useState } from 'react';
import {  Pressable, StyleSheet,  Text,  View } from 'react-native';
import ImageView from "react-native-image-viewing";
import { DataStore, Storage } from 'aws-amplify';
import { Attachment } from '../../models';
import { Button } from 'react-native-paper';



// const images2 = [
//     {
//       uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
//     },
//     {
//       uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
//     },
//     {
//       uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
//     },
//   ];

const Gallery = ({task}) => {
 
    const [visible, setIsVisible] = useState(false);
    const [images, setImages] = useState([]);

    const getImages = async () =>{
      const attachments = await DataStore.query(Attachment, (o)=>o.taskID.eq(task?.id));

      const downloadedImages = await Promise.all(
          attachments.filter(attachment => attachment.type!=='DOCUMENT').map(async (attachment) =>
          
              {
              
                      return Storage.get(attachment.storageKey).then((uri) => ({
                          uri,
                      }))
                  
              }
        
          
         
         
          )
        );


      console.log("downloaded Image", downloadedImages);
    
      setImages(downloadedImages);      

  }


  useEffect(()=>{
      getImages();

      
    },[visible])


    return (
        <View style={styles.centeredView}>
          
        <ImageView
        images={images}
        
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        />

            <View style={styles.button}>
            <Button buttonColor='grey' icon="image" mode="contained" onPress={() => setIsVisible(true)}>
                        View Images</Button>

            {/* <Pressable onPress={() => setIsVisible(true)}  style={styles.textStyle}>
              <Text>View Images</Text>
            </Pressable> */}
            </View>

        </View>
        
    )
}

export default Gallery;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
     
      },
      modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        
         },
      button: {
        borderRadius: 20,
        paddingTop: 10,
        // elevation: 2,
      },
      buttonOpen: {
        // backgroundColor: '#000066',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        paddingTop: 10,
        
        },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
  });
  