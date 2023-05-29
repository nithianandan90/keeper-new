// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserType = {
  "CLIENT": "CLIENT",
  "PARTNER": "PARTNER",
  "MANAGER": "MANAGER"
};

const AttachmentType = {
  "IMAGE": "IMAGE",
  "VIDEO": "VIDEO",
  "DOCUMENT": "DOCUMENT"
};

const { Notifications, Properties, Task, Attachment, ChatRoom, Message, User, UserChatRoom } = initSchema(schema);

export {
  Notifications,
  Properties,
  Task,
  Attachment,
  ChatRoom,
  Message,
  User,
  UserChatRoom,
  UserType,
  AttachmentType
};