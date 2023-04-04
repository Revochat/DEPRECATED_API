import ServerSocket from "../../../"
import dotenv from 'dotenv'
import { Socket } from "socket.io";
import axios from "axios";
import { utils } from "../../../utils";

dotenv.config()

export class BlockedRemoveEvent {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run(userID: number) {
        try {
            const response = await axios.get(`${process.env.BASE_URI}/api/v1/client/blocked/remove/${userID}`, utils.set.bearer(ServerSocket.users[this.socket.id].token))
            ServerSocket.io.to(this.socket.id).emit("user", response.data)
        } catch(err) {
            console.log(err)
        }
    }
}