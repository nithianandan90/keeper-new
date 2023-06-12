import React, { useState, useEffect } from "react";
import { FlatList, View,  StyleSheet, Button } from "react-native";
import ContactListItem from "../components/ContactListItem";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { useNavigation, useRoute } from "@react-navigation/native";



const AddContactsToGroup = () => {
  //test commit
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const chatRoom = route.params.chatRoom;

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      
      
      setUsers(result.data?.listUsers?.items.filter((item)=>
        !chatRoom.users.items.some(
          (chatRoomUser)=> 
            !chatRoomUser._deleted && item.id  === chatRoomUser.userId
        )
      )
      );
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Add to group" disabled={selectedUserIds.length<1} onPress={onAddToGroupPress} />
      ),
    });
  }, [selectedUserIds]);


  const onAddToGroupPress = async (user) => {
    console.warn("Pressed");




    

    //add the clicked user to the Chatroom


    await Promise.all(selectedUserIds.map((userId) => API.graphql(
            graphqlOperation(createUserChatRoom, {
                input: {chatRoomId: chatRoom.id, userId}
                })
            ) 
        )
      );

    // console.log("user",user.id);

    // await API.graphql(
    //   graphqlOperation(createUserChatRoom, {
    //     input: {chatRoomId: newChatRoom.id, userId: user.id}
    //   })
    // )



    setSelectedUserIds([]);
    

    navigation.goBack();


  }



  const onContactPress = (id) => {
    setSelectedUserIds((userIds)=>{
        if (userIds.includes(id)){
            //remove id from selected
            return [...userIds].filter(uid=>uid!==id);
        }else{ 
            //add id into selected
            return [...userIds,id];
        }
    })
  }


  return (
    <View style={styles.container}>
      
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <ContactListItem user={item} selectable onPress={()=>onContactPress(item.id)} isSelected={selectedUserIds.includes(item.id)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "white" },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray",
    padding: 10,
    margin: 10,
  },
});

export default AddContactsToGroup;