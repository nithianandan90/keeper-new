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
      
      

      setChatRooms(response.data.getUser.ChatRooms.items);
    } 
  
    fetchChatRooms();
    console.log()
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
