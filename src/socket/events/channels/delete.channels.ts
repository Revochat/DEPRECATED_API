import { Socket } from 'socket.io';

export class ChannelDeleteChannel {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run() {
        
    }
}