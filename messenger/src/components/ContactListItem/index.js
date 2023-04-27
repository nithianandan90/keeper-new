import { Text, Image, StyleSheet, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createChatRoom, createUserChatRoom} from '../../graphql/mutations';
import { getCommonChatRoomWithUser } from '../../services/chatRoomService';


dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();

  const onPress = async () => {
    console.warn("Pressed");

   const existingChatRoom = await getCommonChatRoomWithUser(user.id);

   if(existingChatRoom){
    navigation.navigate("Chat", {id: existingChatRoom.id})
    return;
   }

    //chack if we already have a chatroom with user

    //create a new chatroom

    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, {input: {}})
    )


    console.log(newChatRoomData);
    
    if(!newChatRoomData.data?.createChatRoom){
      console.log("error creating chatroom");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;

    //add the clicked user to the Chatroom

    console.log("user",user.id);

    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {chatRoomId: newChatRoom.id, userId: user.id}
      })
    )

    //add the auth user to the chatroom

    const authUser = await Auth.currentAuthenticatedUser();

    await API.graphql(
      graphqlOperation(createUserChatRoom, {input: {chatRoomId: newChatRoom.id, userId: authUser.attributes.sub}
      })
    )


 

    // navigation.navigate("Chat", {id: newChatRoom.id});


  }


  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>

        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>
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
    flex: 1
  },
  subTitle: {
    color: 'gray',
    
  },
});

export default ContactListItem;
