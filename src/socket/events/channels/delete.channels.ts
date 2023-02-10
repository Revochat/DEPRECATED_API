import axios from 'axios';
import { Socket } from 'socket.io';
import ServerSocket from '../..';
import { utils } from '../../utils';

export class ChannelDeleteChannel {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run(channelID: number) {
        try {
            const response = await axios.get(`${process.env.BASE_URI}/api/v1/channel/remove/${channelID}`, utils.set.bearer(ServerSocket.users[this.socket.id].token))
            ServerSocket.io.in(channelID.toString()).emit("messageDelete", response.data)
        } catch(err) {
            console.log(err)
        }
    }
}