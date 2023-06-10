import { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { API, graphqlOperation } from "aws-amplify";
import { onUpdateChatRoom } from "../graphql/subscriptions";
import { deleteUserChatRoom } from '../graphql/mutations';
import ContactListItem from "../components/ContactListItem";



const ChatRoomInfo = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation  = useNavigation();


  const chatroomId = route.params.id;

  const fetchChatRoom = async () => {

    setLoading(true);

    const result = await API.graphql(graphqlOperation(getChatRoom, { id: chatroomId }));
    setChatRoom(result.data?.getChatRoom);
      
    setLoading(false);

  }

  useEffect(() => {
 
    fetchChatRoom();

    // Subscribe to onUpdateChatRoom
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, {
        filter: { id: { eq: chatroomId } },
      })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (error) => console.warn(error),
    });

    // Stop receiving data updates from the subscription
    return () => subscription.unsubscribe();
  }, [chatroomId]);


  const removeChatRoomUser = async (chatRoomUser) => {
    const result = await API.graphql(
      graphqlOperation(deleteUserChatRoom, {input: {_version: chatRoomUser._version, id: chatRoomUser.id},
      })
    )
    
    console.log(result);
  }


  const onContactPress = (chatRoomUser) => {
    Alert.alert("Removing the user", 
                `Are you sure you want to remove ${chatRoomUser.user.name} from this group`,
                [{
                    text: 'Cancel',
                    style: "cancel"
                },
                {
                    text: 'Remove',
                    style: "destructive",
                    onPress: ()=>removeChatRoomUser(chatRoomUser)
                }]
    )
  }


  const onPress = () =>{
    
    const property = chatRoom.Property;

    console.log('property', property)

    navigation.navigate('Property Details', {property})
  }


  if (!chatRoom) {
    return <ActivityIndicator color={'#512da8'}/>;
  }

  const users = chatRoom.users.items.filter((item) => !item._deleted);

  console.log(chatRoom)

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} android_ripple={{radius:200}}>
        <Text style={styles.title}>{chatRoom.Property.title}</Text>
        <Text style={styles.subTitle}>
            {chatRoom.Property.streetAddress}
          </Text>
          <Text style={styles.subTitle}>
          {chatRoom.Property.postcode}, {chatRoom.Property.state}
          </Text>
      </Pressable>
      
      
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
        <Text style={styles.sectionTitle}>
          {users.length} Participants
        </Text>
        <Text onPress={()=>navigation.navigate("Add Contacts", {chatRoom})} style={{fontWeight: "bold", color: "royalblue"}}>Invite Users</Text>
      </View>
      <View style={styles.section}>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <ContactListItem
              user={item.user}
              onPress={()=>onContactPress(item)}
            />
          )}
          onRefresh={fetchChatRoom}
          refreshing={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 14,

  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 10,
  },
});

export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      name
      updatedAt
      Property{
        streetAddress
        title
        postcode
        state
        status
        type
        updatedAt
        physicalAccess
        id
        headerPic
        createdAt
        city
        usersID
        Attachments{
          items{
            _deleted
            width
            _lastChangedAt
            _version
            chatroomID
            createdAt
            duration
            fileName
            height
            id
            messageID
            propertiesID
            storageKey
            taskID
            type
            updatedAt
          }
        }
        _version
        _lastChangedAt
        _deleted
      }
      users {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          user {
            id
            name
            status
            image {
              storageKey
              fileName
              _deleted
              width
              updatedAt
              type
              taskID
              propertiesID
              messageID
              id
              height
              duration
              createdAt
              chatroomID
              _version
              _lastChangedAt
            }
          }
        }
        nextToken
        startedAt
      }
      createdAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;

export default ChatRoomInfo;