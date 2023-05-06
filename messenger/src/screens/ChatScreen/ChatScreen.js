import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Message from '../../components/Message';
import InputBox from '../../components/InputBox';
import bg from '../../../assets/images/BG.png';
import {API, graphqlOperation} from 'aws-amplify';
import { listMessagesByChatRoom } from './ChatScreenQueries';
import { getChatRoom} from '../../graphql/queries';
import {onCreateMessage, onUpdateChatRoom} from '../../graphql/subscriptions'
import { Feather } from '@expo/vector-icons';

const ChatScreen = () => {
  
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const chatroomID = route.params.id;




  // fetch Chat Room
  useEffect(()=>{
    API.graphql(
      graphqlOperation(
        getChatRoom, {id: chatroomID}
      )
    ).then((result)=>{
    
      setChatRoom(result.data?.getChatRoom);
      
    })


    const subscription = API.graphql(graphqlOperation(onUpdateChatRoom, {filter: {id: {eq: chatroomID } } } ) 
    ).subscribe({
      next: ({value})=>{
                setChatRoom((cr)=>({...(cr || {}), 
                          ...value.data.onUpdateChatRoom
                        }));
      },
      error: (err) => console.warn(err)
    })

    return ()=>subscription.unsubscribe();

  },[chatroomID])


  //fetch Messages
  useEffect(()=>{

    API.graphql(
      graphqlOperation(
        listMessagesByChatRoom, {chatroomID, sortDirection:"DESC"}
      )
    ).then((result)=>{
    
      setMessages(result.data?.listMessagesByChatRoom?.items);
  
    })

    //subscribe to new messages

    const subscription = API.graphql(graphqlOperation(onCreateMessage, {filter: {chatroomID: {eq: chatroomID}}})).subscribe({
      next: ({value})=>{
        
        setMessages((m)=>[value.data.onCreateMessage, ...m])
      },
      error: (err)=>console.warn(err)
    })

    return () => subscription.unsubscribe();

  },[chatroomID])



  useEffect(() => {
    navigation.setOptions({ title: route.params.name, headerRight:()=>
      <Feather onPress = {()=>navigation.navigate("Group Info", {id:chatroomID})} name="more-horizontal" size={24} color="gray" /> 
    });
  }, [route.params.name]);

  
  if(!chatRoom){
    return <ActivityIndicator/>;
  }


  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 200}
      style={styles.bg}
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Message message={item} />}
          style={styles.list}
          inverted
        />
        <InputBox chatroom={chatRoom} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});

export default ChatScreen;
