import {LoginEvent} from "./connect/login.events";
import { MessageCreateEvent, MessageDeleteEvent } from "./messages";
import { Socket } from "socket.io";
import ServerSocket from "..";
import { ChannelDeleteChannel, ChannelPrivateCreateEvent, ChannelsGetEvent } from "./channels";
import { ActivityEvent, PingEvent } from "./users/user";
import { FriendAddEvent, FriendRemoveEvent, FriendRequestsReceivedEvent } from "./users/friends";
import { RoleCreateEvent } from "./roles/create.roles.event";
import { IMessage } from "../../database/models/Message";
import Logger from "../../client/logger.client";

export class SocketEvents {
    private socket: Socket;
    constructor(socket: Socket) {
        this.socket = socket;
    }

    public disconnect() {
        delete ServerSocket.users[this.socket.id];
        Logger.debug("User disconnected from " + this.socket.id);
    }

    public userActivity(){ // ToDo 
        const activity = new ActivityEvent(this.socket);
        activity.run();
    }

    public roleCreate(){ // ToDo
        const roleCreate = new RoleCreateEvent(this.socket);
        //roleCreate.run();
    }

    public roleDelete(roleID: number){ // ToDo
        const roleDelete = new RoleCreateEvent(this.socket);
        roleDelete.run(roleID);
    }

    public roleGet(roleID: number){ // ToDo
        const roleGet = new RoleCreateEvent(this.socket);
        roleGet.run(roleID);
    }

    public channelCreate(friendID: number){ // ToDo
        const channelCreate = new ChannelPrivateCreateEvent(this.socket);
        channelCreate.run(friendID);
    }

    public channelDelete(channelID: number){ // ToDo
        const channelDelete = new ChannelDeleteChannel(this.socket);
        channelDelete.run(channelID);
    }

    public channelsGet(){ 
        const channelsGet = new ChannelsGetEvent(this.socket);
        channelsGet.run();
    }

    public pingUser(user_id: number, message: IMessage) {
        const ping = new PingEvent(this.socket);
        ping.run(user_id, message);
    }

    public messageCreate(channelID: number, message: any) {
        const messageCreate = new MessageCreateEvent(this.socket);
        messageCreate.run(channelID, message);
    }

    public messageDelete(channelID: number, messageID: number) {
        const messageDelete = new MessageDeleteEvent(this.socket);
        messageDelete.run(channelID, messageID);
    }

    public friendAdd(friendID: number) {
        const friendAdd = new FriendAddEvent(this.socket);
        friendAdd.run(friendID);
    }

    public friendRemove(friendID: number) {
        const friendRemove = new FriendRemoveEvent(this.socket);
        friendRemove.run(friendID);
    }   

    public friendsRequestsReceived(){
        const friendsRequestsReceived = new FriendRequestsReceivedEvent(this.socket);
        friendsRequestsReceived.run();
    }


    public async login(token: string) { // This is the event that is called when the client emits "login" 
        const Login = new LoginEvent(this.socket);
        Login.run(token);
    }
    
    public get SocketUsers() {
        return ServerSocket.users
    }

}