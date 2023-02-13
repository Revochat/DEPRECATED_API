import { Socket } from 'socket.io';
import ServerSocket from '../../..';
import Logger from '../../../../client/logger.client';
import { IMessage } from '../../../../database/models/Message';

export class PingEvent {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run(user_id: number, message: IMessage) {
        try {
            for(let user in ServerSocket.users) {
                if(ServerSocket.users[user].user_id == user_id) {
                    ServerSocket.io.to(user).emit("pingUser", message)
                }
            }
        } catch (error) {
            Logger.error(error);
        }
    }
}