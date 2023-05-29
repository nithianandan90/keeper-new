import { Text, Image, StyleSheet, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {Auth, API, graphqlOperation, Storage} from 'aws-amplify';

dayjs.extend(relativeTime);

const ContactListItem = ({ user, onPress=()=>{}, selectable=false, isSelected=false }) => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState();
 
  const getImage = async ()=>{
    
    const uri = await Storage.get(user.image.storageKey);
    setImageUri(uri);
 
  }


  useEffect(()=>{
    if(user.image){
    getImage();
    }
  },[])



  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>

        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      
      </View>
      {selectable&&
        (isSelected?(<AntDesign name="checkcircle" size={24} color="royalblue" />):(<FontAwesome name="circle-thin" size={24} color="lightgray" />)
        )
        }
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  subTitle: {
    color: 'gray',
    
  },
});

export default ContactListItem;
