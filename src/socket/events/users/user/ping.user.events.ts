import { Socket } from 'socket.io';
import ServerSocket from '../../..';

export class PingEvent {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run(user_id: number) {
        for(let user in ServerSocket.users) {
            if(ServerSocket.users[user].user_id == user_id) {
                ServerSocket.io.to(user).emit("pingUser", "pinged")
            }
            console.log(ServerSocket.users[user].user_id)
            console.log(user_id)
        }
    }
}