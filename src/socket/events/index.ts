import {LoginEvent} from "./connect/login.events";
import { MessageCreateEvent, MessageDeleteEvent } from "./messages";
import { Socket } from "socket.io";
import ServerSocket from "..";
import { ChannelCreateEvent, ChannelsGetEvent } from "./channels";
import { ActivityEvent } from "./users/user";
import { FriendAddEvent, FriendRemoveEvent, FriendRequestsReceivedEvent } from "./users/friends";
import { RoleCreateEvent } from "./roles/create.roles.event";

export class SocketEvents {
    private socket: Socket;
    constructor(socket: Socket) {
        this.socket = socket;
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

    public channelCreate(){ // ToDo
        const channelCreate = new ChannelCreateEvent(this.socket);
        channelCreate.run();
    }

    public channelDelete(){ // ToDo
        const channelDelete = new ChannelCreateEvent(this.socket);
        channelDelete.run();
    }

    public channelsGet(){ 
        const channelsGet = new ChannelsGetEvent(this.socket);
        channelsGet.run();
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