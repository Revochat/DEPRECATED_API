import {LoginEvent} from "./connect/login.events";
import { MessageCreate } from "./messages";
import { Socket } from "socket.io";
import ServerSocket from "..";

export const sock = {
    login: LoginEvent,
    messageCreate: MessageCreate
}

export class SocketEvents {
    private socket!: Socket;
    constructor(_socket: Socket) {
        this.socket = _socket;
    }

    public get event(){
        return sock;
    }

    public login(token: string){
        const Login = new LoginEvent(this.socket);
        console.log(this.Socket)    
        return Login.run(token);
    }

    public get Socket() {
        return this.socket;
    }

    public get SocketID() {
        return this.socket.id;
    }

    public get SocketUsers() {
        return ServerSocket.users
    }

}