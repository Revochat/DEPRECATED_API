import {LoginEvent} from "./connect/login.events";
import { MessageCreate } from "./messages";
import { Socket } from "socket.io";
import ServerSocket from "..";
import Logger from "../../client/logger.client";

export const sock = {
    login: LoginEvent,
    messageCreate: MessageCreate
}

export class SocketEvents {
    private socket: Socket;
    constructor(socket: Socket) {
        this.socket = socket;
    }

    public get event() {
        return sock;
    }

    public async login(token: string) { // This is the event that is called when the client emits "login" 
        const Login = new LoginEvent(this.socket);
        Login.run(token);
    }
    
    public get SocketUsers() {
        return ServerSocket.users
    }

}