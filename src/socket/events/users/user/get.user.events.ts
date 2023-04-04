import axios from "axios";
import ServerSocket from "../../..";
import { Socket } from "socket.io";
import dotenv from 'dotenv'
import { utils } from "../../../utils";

dotenv.config()

export class UserGetEvent {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }
    public async run() {
        try {
            const response = await axios.get(`${process.env.BASE_URI}/api/v1/client/get/user/token`, utils.set.bearer(ServerSocket.users[this.socket.id].token))
            ServerSocket.io.to(this.socket.id).emit("userGet", response.data.data);
        } catch(err){
            console.log("Error resolving user" + err)
        }
    }
}