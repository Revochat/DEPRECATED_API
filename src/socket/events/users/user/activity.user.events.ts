import { Socket } from 'socket.io';

export class ActivityEvent {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run() {
        
    }
}