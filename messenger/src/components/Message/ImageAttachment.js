import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ImageView from 'react-native-image-viewing';

const ImageAttachment = ({attachments}) => {
  
  const [imageViewVisible, setImageViewVisible] = useState(false);
  return (
  <>  
    {attachments.map((attachment)=>(  
    <Pressable 
      key={attachment.id}
      style={[ styles.imageContainer, 
      attachments.length===1 && {width: '100%'}]} 
      onPress={()=>setImageViewVisible(true)}>
      <Image source={{uri: attachment.uri}} style={styles.image} />
    </Pressable>
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
})