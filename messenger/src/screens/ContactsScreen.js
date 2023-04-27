import { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
// import chats from '../../assets/data/chats.json';
import ContactListItem from '../components/ContactListItem';
import {API, graphqlOperation} from 'aws-amplify';
import {listUsers} from '../graphql/queries';




const ContactsScreen = () => {

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    API.graphql(graphqlOperation(listUsers)).then((result)=>{
      // console.log(result.data.listUsers.items);
      setUsers(result.data?.listUsers?.items);
    })     
  },[])


  


  return (
    
    <FlatList
      data={users}
      renderItem={({ item }) => <ContactListItem user={item} />}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ContactsScreen;
