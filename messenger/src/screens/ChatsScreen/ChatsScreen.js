import { FlatList } from 'react-native';
import ChatListItem from '../../components/ChatListItem';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listChatRooms} from './queries';
import { useEffect, useState } from 'react';



const ChatsScreen = () => {


  const [chatRooms, setChatRooms] = useState([]);
  const [authUser, setAuthUser] = useState([]);

  useEffect(()=>{
    
    
    const fetchChatRooms = async () => {

      const authUser = await Auth.currentAuthenticatedUser();

      setAuthUser(authUser);
      const response = await API.graphql(
        graphqlOperation(listChatRooms,{id: authUser.attributes.sub})
      )
      
      const rooms = response?.data?.getUser?.ChatRooms?.items || [];
      
      const sortedRooms = rooms.sort((room1, room2)=>new Date(room2.chatRoom.updatedAt) - new Date(room1.chatRoom.updatedAt));

        console.log(new Date(rooms[0].chatRoom.updatedAt) - new Date(rooms[1].chatRoom.updatedAt));

      setChatRooms(sortedRooms);
    } 
  
    fetchChatRooms();
    // console.log(chatRooms);
  },[])

  return (
    <FlatList
      data={chatRooms}
      renderItem={({ item }) => <ChatListItem chat={item.chatRoom} sub={authUser.attributes.sub} />}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ChatsScreen;
