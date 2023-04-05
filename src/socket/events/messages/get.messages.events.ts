import ServerSocket from "../.."
import dotenv from 'dotenv'
import { Socket } from "socket.io";
import axios from "axios";
import { utils } from "../../utils";

dotenv.config()

export class MessageGetEvent {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run(channelID: number) {
        try {
            const response = await axios.get(`${process.env.BASE_URI}/api/v1/channel/get/messages/${channelID}/100`, utils.set.bearer(ServerSocket.users[this.socket.id].token))
            ServerSocket.io.in(channelID.toString()).emit(channelID.toString(), response.data.data)
        } catch(err) {
            console.log(err)
        }
    }
}