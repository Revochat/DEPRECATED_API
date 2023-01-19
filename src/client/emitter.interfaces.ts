import { IUserModel } from "../database/models/User";
import { Types } from "mongoose";
import { IMessage } from "../database/models/Message";
import { IChannel } from "../database/models/Channel";
import { IServer } from "../database/models/Server";

export interface Friend extends IUserModel  {
    _id: Types.ObjectId;
} 

export interface User extends IUserModel {}


export interface Message extends IMessage {
    _id: Types.ObjectId;
}

export interface Channel extends IChannel {
    _id: Types.ObjectId;
}

export interface UserReady {
    user: User;
}

export interface FriendAdd {
    user: User;
    friend: Friend;
}

export interface FriendRemove {
    user: User;
    friend: Friend;
}

export interface MessageCreate {
    message: Message;
}

export interface MessageDelete {
    message: Message;
}

export interface MessageUpdate {
    message: Message;
}

export interface MessageReactionAdd {
    message: Message;
}

export interface MessageReactionRemove {
    message: Message;
}

export interface MessageReactionRemoveAll {
    message: Message;
}

export interface MessageReactionRemoveEmoji {
    message: Message;
}

export interface PresenceUpdate {
    user: User;
}

export interface UserUpdate {
    user: User;
}

export interface VoiceStateUpdate {
    user: User;
}

export interface ChannelCreate {
    channel: Channel;
}

export interface ChannelDelete {
    channel: Channel;
}

export interface ChannelUpdate {
    channel: Channel;
}

export interface ChannelPinsUpdate {
    channel: Channel;
}

export interface GuildCreate {
    guild: IServer;
}

export interface GuildDelete {
    guild: IServer;
}

export interface GuildUpdate {
    guild: IServer;
}

export interface GuildBanAdd {
    guild: IServer;
    user: User;
}

export interface GuildBanRemove {
    guild: IServer;
    user: User;
}

export interface GuildEmojisUpdate {
    guild: IServer;
}
