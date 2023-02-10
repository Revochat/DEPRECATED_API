import axios from "axios";
import { Socket } from "socket.io";
import ServerSocket from "../..";
import { utils } from "../../utils";

export class ChannelPrivateCreateEvent {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run(friendID: number) {
        try {
            const response = await axios.get(`${process.env.BASE_URI}/api/v1/channel/create/private/${friendID}`, utils.set.bearer(ServerSocket.users[this.socket.id].token))
            ServerSocket.io.to(this.socket.id).emit("channelCreate", response.data)
        } catch(err) {
            console.log(err)
        }
    }
}