import ServerSocket from "../../"
import dotenv from 'dotenv'
import { Socket } from "socket.io";
import axios from "axios";
import { utils } from "../../utils";

dotenv.config()

export class ServerDeleteEvent {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run(serverName: string) {
        try {
            const response = await axios.get(`${process.env.API_URL}/api/v1/server/remove/${serverName}`, utils.set.bearer(ServerSocket.users[this.socket.id].token))
            ServerSocket.io.to(this.socket.id).emit("server", response.data)
        } catch(err) {
            console.log(err)
        }
    }
}