import {API, graphqlOperation, Auth} from 'aws-amplify';
import { listChatRooms } from '../graphql/queries';

export const getCommonChatRoomWithUser = async (userID, propertyID) => {

    const authUser = await Auth.currentAuthenticatedUser();

    //get all chatroom of property
    const rooms = await API.graphql(graphqlOperation(
      listChatRooms, {filter:{chatRoomPropertyId: {eq: propertyID}}}
  ))

  
  return rooms.data.listChatRooms?.items;

  //   //get all chatroom of user1

  //   const response = await API.graphql(graphqlOperation(
  //       listChatRoomsUsers, {id: authUser.attributes.sub, chatRoomPropertyId: {eq: propertyID}}
  //   ))

  //  const chatRooms = response.data?.getUser.ChatRooms?.items || [];

  //   // console.log(chatRooms);

  //   const chatRoom = chatRooms.find((chatRoomItem)=>{
      
  //       // console.log(chatRoomItem.chatRoom.users.items);
  //       return (
          
  //         chatRoomItem.chatRoom.users.items.length === 2 &&
  //         chatRoomItem.chatRoom.users.items.some((userItem) => userItem.user.id === userID))
      
  //     }
      
  //     )

  //   return chatRoom;


}


export const listChatRoomsUsers = /* GraphQL */
`
query GetUser($id: ID!) {
    getUser(id: $id) {  
      id
      ChatRooms {
        items {
          chatRoom {
            id
            users {
              items {
                user {
                  id
                  image
                  name
                }
              }
            }
            LastMessage {
              id
              createdAt
              text
            }
          }
        }
      }
    }
  }
  
  ` 