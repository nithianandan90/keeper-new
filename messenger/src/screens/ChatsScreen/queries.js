export const listChatRooms = /* GraphQL */
`
query GetUser($id: ID!) {
    getUser(id: $id) {  
      id
      ChatRooms {
        items {
          _deleted
          chatRoom {
            id
            chatRoomPropertyId
            Property {
              title
              streetAddress
            }
            name
            image
            updatedAt
            users {
              items {
                user {
                  id
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