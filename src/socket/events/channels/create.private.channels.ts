import { Socket } from "socket.io";

export class ChannelPrivateCreateEvent {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run() {
        
    }
}