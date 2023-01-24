import {LoginEvent} from "./connect/login.events";
import { MessageCreate } from "./messages";
import { Socket } from "socket.io";
import ServerSocket from "..";

export const sock = {
    login: LoginEvent,
    messageCreate: MessageCreate
}

export class SocketEvents {
    private socket: Socket;
    constructor(socket: Socket){
        this.socket = socket;
        console.log(this.socket)
    }

    public get event(){
        return sock;
    }

    public async login(token: string) {
        const Login = new LoginEvent(this.socket);  
        Login.run(token);
    }
    
    public get SocketUsers() {
        return ServerSocket.users
    }

}