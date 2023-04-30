import { useState, useEffect } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
// import chats from '../../assets/data/chats.json';
import ContactListItem from '../components/ContactListItem';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listUsers} from '../graphql/queries';
import {MaterialIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {createChatRoom, createUserChatRoom} from '../graphql/mutations';
import { getCommonChatRoomWithUser } from '../services/chatRoomService';



const ContactsScreen = () => {

  const [users, setUsers] = useState([]);


  const navigation = useNavigation();

  useEffect(()=>{
    API.graphql(graphqlOperation(listUsers)).then((result)=>{
      setUsers(result.data?.listUsers?.items);
    })     
  },[])

  const createChatRoomWithUser = async (user) => {
    console.warn("Pressed");

   const existingChatRoom = await getCommonChatRoomWithUser(user.id);

   if(existingChatRoom){


      navigation.navigate("Chat", {id: existingChatRoom.chatRoom.id})
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
    
    <FlatList
      data={users}
      renderItem={({ item }) => <ContactListItem user={item} onPress={()=>createChatRoomWithUser(item)} />}
      style={{ backgroundColor: 'white' }}
      ListHeaderComponent={() => (
        <Pressable
          onPress={() => {navigation.navigate("New Group")}}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            paddingHorizontal: 20,
          }}
        >
          <MaterialIcons
            name="group"
            size={24}
            color="royalblue"
            style={{
              marginRight: 20,
              backgroundColor: "gainsboro",
              padding: 7,
              borderRadius: 20,
              overflow: "hidden",
            }}
          />
          <Text style={{ color: "royalblue", fontSize: 16 }}>New Group</Text>
        </Pressable>
      )}
    />
  );
};

export default ContactsScreen;
