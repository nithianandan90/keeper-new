/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNotifications = /* GraphQL */ `
  mutation CreateNotifications(
    $input: CreateNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    createNotifications(input: $input, condition: $condition) {
      id
      updateDetails
      opened
      createdAt
      usersID
      taskID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateNotifications = /* GraphQL */ `
  mutation UpdateNotifications(
    $input: UpdateNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    updateNotifications(input: $input, condition: $condition) {
      id
      updateDetails
      opened
      createdAt
      usersID
      taskID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteNotifications = /* GraphQL */ `
  mutation DeleteNotifications(
    $input: DeleteNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    deleteNotifications(input: $input, condition: $condition) {
      id
      updateDetails
      opened
      createdAt
      usersID
      taskID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createProperties = /* GraphQL */ `
  mutation CreateProperties(
    $input: CreatePropertiesInput!
    $condition: ModelPropertiesConditionInput
  ) {
    createProperties(input: $input, condition: $condition) {
      id
      title
      streetAddress
      postcode
      city
      state
      headerPic
      type
      physicalAccess
      status
      active
      Tasks {
        items {
          id
          status
          startDate
          completionDate
          createdAt
          title
          subTitle
          taskType
          recurrence
          active
          propertiesID
          usersID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Attachments {
        items {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      usersID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateProperties = /* GraphQL */ `
  mutation UpdateProperties(
    $input: UpdatePropertiesInput!
    $condition: ModelPropertiesConditionInput
  ) {
    updateProperties(input: $input, condition: $condition) {
      id
      title
      streetAddress
      postcode
      city
      state
      headerPic
      type
      physicalAccess
      status
      active
      Tasks {
        items {
          id
          status
          startDate
          completionDate
          createdAt
          title
          subTitle
          taskType
          recurrence
          active
          propertiesID
          usersID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Attachments {
        items {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      usersID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteProperties = /* GraphQL */ `
  mutation DeleteProperties(
    $input: DeletePropertiesInput!
    $condition: ModelPropertiesConditionInput
  ) {
    deleteProperties(input: $input, condition: $condition) {
      id
      title
      streetAddress
      postcode
      city
      state
      headerPic
      type
      physicalAccess
      status
      active
      Tasks {
        items {
          id
          status
          startDate
          completionDate
          createdAt
          title
          subTitle
          taskType
          recurrence
          active
          propertiesID
          usersID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Attachments {
        items {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      usersID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      status
      startDate
      completionDate
      createdAt
      title
      subTitle
      taskType
      recurrence
      active
      propertiesID
      usersID
      Attachments {
        items {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Notifications {
        items {
          id
          updateDetails
          opened
          createdAt
          usersID
          taskID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      status
      startDate
      completionDate
      createdAt
      title
      subTitle
      taskType
      recurrence
      active
      propertiesID
      usersID
      Attachments {
        items {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Notifications {
        items {
          id
          updateDetails
          opened
          createdAt
          usersID
          taskID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      status
      startDate
      completionDate
      createdAt
      title
      subTitle
      taskType
      recurrence
      active
      propertiesID
      usersID
      Attachments {
        items {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Notifications {
        items {
          id
          updateDetails
          opened
          createdAt
          usersID
          taskID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createAttachment = /* GraphQL */ `
  mutation CreateAttachment(
    $input: CreateAttachmentInput!
    $condition: ModelAttachmentConditionInput
  ) {
    createAttachment(input: $input, condition: $condition) {
      id
      storageKey
      fileName
      createdAt
      type
      width
      height
      duration
      messageID
      chatroomID
      taskID
      propertiesID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateAttachment = /* GraphQL */ `
  mutation UpdateAttachment(
    $input: UpdateAttachmentInput!
    $condition: ModelAttachmentConditionInput
  ) {
    updateAttachment(input: $input, condition: $condition) {
      id
      storageKey
      fileName
      createdAt
      type
      width
      height
      duration
      messageID
      chatroomID
      taskID
      propertiesID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteAttachment = /* GraphQL */ `
  mutation DeleteAttachment(
    $input: DeleteAttachmentInput!
    $condition: ModelAttachmentConditionInput
  ) {
    deleteAttachment(input: $input, condition: $condition) {
      id
      storageKey
      fileName
      createdAt
      type
      width
      height
      duration
      messageID
      chatroomID
      taskID
      propertiesID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      name
      image
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          images
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
        }
        nextToken
        startedAt
      }
      Property {
        id
        title
        streetAddress
        postcode
        city
        state
        headerPic
        type
        physicalAccess
        status
        active
        Tasks {
          nextToken
          startedAt
        }
        Attachments {
          nextToken
          startedAt
        }
        usersID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      LastMessage {
        id
        createdAt
        text
        chatroomID
        userID
        images
        Attachments {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Attachments {
        items {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomPropertyId
      chatRoomLastMessageId
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      name
      image
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          images
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
        }
        nextToken
        startedAt
      }
      Property {
        id
        title
        streetAddress
        postcode
        city
        state
        headerPic
        type
        physicalAccess
        status
        active
        Tasks {
          nextToken
          startedAt
        }
        Attachments {
          nextToken
          startedAt
        }
        usersID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      LastMessage {
        id
        createdAt
        text
        chatroomID
        userID
        images
        Attachments {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Attachments {
        items {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomPropertyId
      chatRoomLastMessageId
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
      name
      image
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          images
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
        }
        nextToken
        startedAt
      }
      Property {
        id
        title
        streetAddress
        postcode
        city
        state
        headerPic
        type
        physicalAccess
        status
        active
        Tasks {
          nextToken
          startedAt
        }
        Attachments {
          nextToken
          startedAt
        }
        usersID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      LastMessage {
        id
        createdAt
        text
        chatroomID
        userID
        images
        Attachments {
          nextToken
          startedAt
        }
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Attachments {
        items {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomPropertyId
      chatRoomLastMessageId
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      createdAt
      text
      chatroomID
      userID
      images
      Attachments {
        items {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      createdAt
      text
      chatroomID
      userID
      images
      Attachments {
        items {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      createdAt
      text
      chatroomID
      userID
      images
      Attachments {
        items {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      username
      email
      telephone
      status
      image {
        id
        storageKey
        fileName
        createdAt
        type
        width
        height
        duration
        messageID
        chatroomID
        taskID
        propertiesID
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      ChatRooms {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      userType
      Tasks {
        items {
          id
          status
          startDate
          completionDate
          createdAt
          title
          subTitle
          taskType
          recurrence
          active
          propertiesID
          usersID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Notifications {
        items {
          id
          updateDetails
          opened
          createdAt
          usersID
          taskID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Properties {
        items {
          id
          title
          streetAddress
          postcode
          city
          state
          headerPic
          type
          physicalAccess
          status
          active
          usersID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userImageId
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      username
      email
      telephone
      status
      image {
        id
        storageKey
        fileName
        createdAt
        type
        width
        height
        duration
        messageID
        chatroomID
        taskID
        propertiesID
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      ChatRooms {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      userType
      Tasks {
        items {
          id
          status
          startDate
          completionDate
          createdAt
          title
          subTitle
          taskType
          recurrence
          active
          propertiesID
          usersID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Notifications {
        items {
          id
          updateDetails
          opened
          createdAt
          usersID
          taskID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Properties {
        items {
          id
          title
          streetAddress
          postcode
          city
          state
          headerPic
          type
          physicalAccess
          status
          active
          usersID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userImageId
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      username
      email
      telephone
      status
      image {
        id
        storageKey
        fileName
        createdAt
        type
        width
        height
        duration
        messageID
        chatroomID
        taskID
        propertiesID
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      ChatRooms {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      userType
      Tasks {
        items {
          id
          status
          startDate
          completionDate
          createdAt
          title
          subTitle
          taskType
          recurrence
          active
          propertiesID
          usersID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Notifications {
        items {
          id
          updateDetails
          opened
          createdAt
          usersID
          taskID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Properties {
        items {
          id
          title
          streetAddress
          postcode
          city
          state
          headerPic
          type
          physicalAccess
          status
          active
          usersID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userImageId
    }
  }
`;
export const createUserChatRoom = /* GraphQL */ `
  mutation CreateUserChatRoom(
    $input: CreateUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    createUserChatRoom(input: $input, condition: $condition) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        name
        image
        Messages {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        Property {
          id
          title
          streetAddress
          postcode
          city
          state
          headerPic
          type
          physicalAccess
          status
          active
          usersID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        LastMessage {
          id
          createdAt
          text
          chatroomID
          userID
          images
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Attachments {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomPropertyId
        chatRoomLastMessageId
      }
      user {
        id
        name
        username
        email
        telephone
        status
        image {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        userType
        Tasks {
          nextToken
          startedAt
        }
        Notifications {
          nextToken
          startedAt
        }
        Properties {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userImageId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUserChatRoom = /* GraphQL */ `
  mutation UpdateUserChatRoom(
    $input: UpdateUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    updateUserChatRoom(input: $input, condition: $condition) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        name
        image
        Messages {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        Property {
          id
          title
          streetAddress
          postcode
          city
          state
          headerPic
          type
          physicalAccess
          status
          active
          usersID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        LastMessage {
          id
          createdAt
          text
          chatroomID
          userID
          images
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Attachments {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomPropertyId
        chatRoomLastMessageId
      }
      user {
        id
        name
        username
        email
        telephone
        status
        image {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        userType
        Tasks {
          nextToken
          startedAt
        }
        Notifications {
          nextToken
          startedAt
        }
        Properties {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userImageId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUserChatRoom = /* GraphQL */ `
  mutation DeleteUserChatRoom(
    $input: DeleteUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    deleteUserChatRoom(input: $input, condition: $condition) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        name
        image
        Messages {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        Property {
          id
          title
          streetAddress
          postcode
          city
          state
          headerPic
          type
          physicalAccess
          status
          active
          usersID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        LastMessage {
          id
          createdAt
          text
          chatroomID
          userID
          images
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Attachments {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomPropertyId
        chatRoomLastMessageId
      }
      user {
        id
        name
        username
        email
        telephone
        status
        image {
          id
          storageKey
          fileName
          createdAt
          type
          width
          height
          duration
          messageID
          chatroomID
          taskID
          propertiesID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        userType
        Tasks {
          nextToken
          startedAt
        }
        Notifications {
          nextToken
          startedAt
        }
        Properties {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userImageId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
