import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum UserType {
  CLIENT = "CLIENT",
  PARTNER = "PARTNER",
  MANAGER = "MANAGER"
}

export enum AttachmentType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT"
}



type EagerNotifications = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notifications, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly updateDetails: string;
  readonly createdAt: string;
  readonly Users?: (User | null)[] | null;
  readonly taskID: string;
  readonly updatedAt?: string | null;
}

type LazyNotifications = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notifications, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly updateDetails: string;
  readonly createdAt: string;
  readonly Users: AsyncCollection<User>;
  readonly taskID: string;
  readonly updatedAt?: string | null;
}

export declare type Notifications = LazyLoading extends LazyLoadingDisabled ? EagerNotifications : LazyNotifications

export declare const Notifications: (new (init: ModelInit<Notifications>) => Notifications) & {
  copyOf(source: Notifications, mutator: (draft: MutableModel<Notifications>) => MutableModel<Notifications> | void): Notifications;
}

type EagerProperties = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Properties, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly streetAddress: string;
  readonly postcode: number;
  readonly city: string;
  readonly state: string;
  readonly headerPic?: string | null;
  readonly type: string;
  readonly physicalAccess: string;
  readonly status: string;
  readonly Users?: (User | null)[] | null;
  readonly Tasks?: (Task | null)[] | null;
  readonly Attachments?: (Attachment | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProperties = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Properties, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly streetAddress: string;
  readonly postcode: number;
  readonly city: string;
  readonly state: string;
  readonly headerPic?: string | null;
  readonly type: string;
  readonly physicalAccess: string;
  readonly status: string;
  readonly Users: AsyncCollection<User>;
  readonly Tasks: AsyncCollection<Task>;
  readonly Attachments: AsyncCollection<Attachment>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Properties = LazyLoading extends LazyLoadingDisabled ? EagerProperties : LazyProperties

export declare const Properties: (new (init: ModelInit<Properties>) => Properties) & {
  copyOf(source: Properties, mutator: (draft: MutableModel<Properties>) => MutableModel<Properties> | void): Properties;
}

type EagerTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly status: string;
  readonly startDate?: string | null;
  readonly completionDate?: string | null;
  readonly createdAt: string;
  readonly title: string;
  readonly subTitle: string;
  readonly taskType: string;
  readonly recurrence: string;
  readonly propertiesID: string;
  readonly Users?: (User | null)[] | null;
  readonly Attachments?: (Attachment | null)[] | null;
  readonly Notifications?: (Notifications | null)[] | null;
  readonly updatedAt?: string | null;
}

type LazyTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly status: string;
  readonly startDate?: string | null;
  readonly completionDate?: string | null;
  readonly createdAt: string;
  readonly title: string;
  readonly subTitle: string;
  readonly taskType: string;
  readonly recurrence: string;
  readonly propertiesID: string;
  readonly Users: AsyncCollection<User>;
  readonly Attachments: AsyncCollection<Attachment>;
  readonly Notifications: AsyncCollection<Notifications>;
  readonly updatedAt?: string | null;
}

export declare type Task = LazyLoading extends LazyLoadingDisabled ? EagerTask : LazyTask

export declare const Task: (new (init: ModelInit<Task>) => Task) & {
  copyOf(source: Task, mutator: (draft: MutableModel<Task>) => MutableModel<Task> | void): Task;
}

type EagerAttachment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Attachment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly storageKey?: string | null;
  readonly fileName?: string | null;
  readonly type: AttachmentType | keyof typeof AttachmentType;
  readonly width?: number | null;
  readonly height?: number | null;
  readonly duration?: number | null;
  readonly messageID?: string | null;
  readonly chatroomID?: string | null;
  readonly taskID?: string | null;
  readonly propertiesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAttachment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Attachment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly storageKey?: string | null;
  readonly fileName?: string | null;
  readonly type: AttachmentType | keyof typeof AttachmentType;
  readonly width?: number | null;
  readonly height?: number | null;
  readonly duration?: number | null;
  readonly messageID?: string | null;
  readonly chatroomID?: string | null;
  readonly taskID?: string | null;
  readonly propertiesID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Attachment = LazyLoading extends LazyLoadingDisabled ? EagerAttachment : LazyAttachment

export declare const Attachment: (new (init: ModelInit<Attachment>) => Attachment) & {
  copyOf(source: Attachment, mutator: (draft: MutableModel<Attachment>) => MutableModel<Attachment> | void): Attachment;
}

type EagerChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly Messages?: (Message | null)[] | null;
  readonly users?: (UserChatRoom | null)[] | null;
  readonly Property?: Properties | null;
  readonly LastMessage?: Message | null;
  readonly Attachments?: (Attachment | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomPropertyId?: string | null;
  readonly chatRoomLastMessageId?: string | null;
}

type LazyChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly Messages: AsyncCollection<Message>;
  readonly users: AsyncCollection<UserChatRoom>;
  readonly Property: AsyncItem<Properties | undefined>;
  readonly LastMessage: AsyncItem<Message | undefined>;
  readonly Attachments: AsyncCollection<Attachment>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomPropertyId?: string | null;
  readonly chatRoomLastMessageId?: string | null;
}

export declare type ChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerChatRoom : LazyChatRoom

export declare const ChatRoom: (new (init: ModelInit<ChatRoom>) => ChatRoom) & {
  copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom>) => MutableModel<ChatRoom> | void): ChatRoom;
}

type EagerMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly createdAt: string;
  readonly text?: string | null;
  readonly chatroomID: string;
  readonly userID: string;
  readonly images?: (string | null)[] | null;
  readonly Attachments?: (Attachment | null)[] | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly createdAt: string;
  readonly text?: string | null;
  readonly chatroomID: string;
  readonly userID: string;
  readonly images?: (string | null)[] | null;
  readonly Attachments: AsyncCollection<Attachment>;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly username?: string | null;
  readonly email?: string | null;
  readonly telephone?: string | null;
  readonly status?: string | null;
  readonly image?: Attachment | null;
  readonly ChatRooms?: (UserChatRoom | null)[] | null;
  readonly userType?: UserType | keyof typeof UserType | null;
  readonly taskID?: string | null;
  readonly propertiesID?: string | null;
  readonly notificationsID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userImageId?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly username?: string | null;
  readonly email?: string | null;
  readonly telephone?: string | null;
  readonly status?: string | null;
  readonly image: AsyncItem<Attachment | undefined>;
  readonly ChatRooms: AsyncCollection<UserChatRoom>;
  readonly userType?: UserType | keyof typeof UserType | null;
  readonly taskID?: string | null;
  readonly propertiesID?: string | null;
  readonly notificationsID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userImageId?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerUserChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomId?: string | null;
  readonly userId?: string | null;
  readonly chatRoom: ChatRoom;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomId?: string | null;
  readonly userId?: string | null;
  readonly chatRoom: AsyncItem<ChatRoom>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerUserChatRoom : LazyUserChatRoom

export declare const UserChatRoom: (new (init: ModelInit<UserChatRoom>) => UserChatRoom) & {
  copyOf(source: UserChatRoom, mutator: (draft: MutableModel<UserChatRoom>) => MutableModel<UserChatRoom> | void): UserChatRoom;
}