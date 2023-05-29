import { useState, useEffect } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
// import chats from '../../assets/data/chats.json';
import ContactListItem from '../../components/ContactListItem';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listUsers} from '../../graphql/queries';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {createChatRoom, createUserChatRoom} from '../../graphql/mutations';
import { getCommonChatRoomWithUser } from '../../services/chatRoomService';
import { StyleSheet } from 'react-native';
import { getUser } from '../../graphql/queries';



const GoToChat = ({propertyID}) => {

  const [users, setUsers] = useState([]);
  const [authUser, setAuthUser]= useState();

  const navigation = useNavigation();

  useEffect(()=>{
    
    retrieveUsers();

  },[])


  const retrieveUsers = async () => {
    const authoUser = await Auth.currentAuthenticatedUser({bypassCache: true});

    const result = await API.graphql(graphqlOperation(listUsers));
    
    const filtered = result.data?.listUsers?.items.filter((item)=>item.id!==authoUser.attributes.sub) 
      
    // console.log(authUser);

    // console.log(JSON.stringify(filtered, null, 2))

    setUsers(filtered);
    setAuthUser(authoUser.attributes.sub);
   
  }


  const createChatRoomWithUser = async () => {
    console.warn("Pressed", propertyID);

   //get user.id of manager
   
   const result = await API.graphql(graphqlOperation(listUsers, {filter:{userType:{eq: "MANAGER"}}}));
    
//    const filtered = result.data?.listUsers?.items.filter((item)=>item.userType==="MANAGER") 
   
    
    //chack if we already have a chatroom with user for said property

    console.log(result.data.listUsers.items[0].id);

    const user = result.data.listUsers.items[0];

    const client = user.id!==authUser;

    const existingChatRoom = await getCommonChatRoomWithUser(user.id, propertyID);

   if(existingChatRoom.length>0){

    console.log('existing room', existingChatRoom[0].id);
      navigation.navigate("Chat", {id: existingChatRoom[0].id, client: client})
    return;
   }


    //create a new chatroom

    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, {input: {chatRoomPropertyId: propertyID}})
    )


    
    if(!newChatRoomData.data?.createChatRoom){
      console.log("error creating chatroom");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;

    //add the clicked user to the Chatroom

    
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {chatRoomId: newChatRoom.id, userId: user.id }
      })
    )

    //add the auth user to the chatroom

    const authUser = await Auth.currentAuthenticatedUser();

    await API.graphql(
      graphqlOperation(createUserChatRoom, {input: {chatRoomId: newChatRoom.id, userId: authUser.attributes.sub}
      })
    )


 

    navigation.navigate("Chat", {id: newChatRoom.id, client: client});


  }
  


  return (

    <View>
        <Ionicons
        name="add-circle"
        size= {45}
        color= "black"
        style={styles.imageIcon}
        onPress={createChatRoomWithUser}
        />

    </View>

    // <FlatList
    //   data={users}
    //   renderItem={({ item }) => <ContactListItem user={item} onPress={()=>createChatRoomWithUser(item)} />}
    //   style={{ backgroundColor: 'white' }}
    //   ListHeaderComponent={() => (
    //     <Pressable
    //       onPress={() => {navigation.navigate("New Group")}}
    //       style={{
    //         flexDirection: "row",
    //         alignItems: "center",
    //         padding: 15,
    //         paddingHorizontal: 20,
    //       }}
    //     >
    //       <MaterialIcons
    //         name="group"
    //         size={24}
    //         color="royalblue"
    //         style={{
    //           marginRight: 20,
    //           backgroundColor: "gainsboro",
    //           padding: 7,
    //           borderRadius: 20,
    //           overflow: "hidden",
    //         }}
    //       />
    //       <Text style={{ color: "royalblue", fontSize: 16 }}>New Group</Text>
    //     </Pressable>
    //   )}
    // />
  );
};


export default GoToChat;


const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    iconContainer: {
        position: 'absolute',
        top: 40,
        left: 10,
        
    },
    iconContainer2: {
        position: 'absolute',
        top: 280,
        right: 10,
        
    },
    image: {
        width: '100%',
        aspectRatio: 5/3
    },
    title: {
        fontSize: 35,
        fontWeight: 600,
        marginVertical: 10,
        margin: 10
    },
    subtitle: {
        color: 'grey',
        fontSize: 15
    },
    container: {
        margin: 10
    },
    menuTitle: {
        marginTop: 20,
        fontSize: 18,
        letterSpacing: 0.7
    },
    button:{
        
        backgroundColor: 'black',
        marginTop: 'auto',
        padding: 20,
        alignItems: 'center'
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }

})

