import axios from "axios";
import { Socket } from "socket.io";
import dotenv from "dotenv";
import { utils } from "../../../utils";
import ServerSocket from "../../..";

dotenv.config();

export class FriendAddEvent {
    private socket: Socket;
       
    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run(friendID: number) {
        try {
            const response = await axios.get(`${process.env.BASE_URI}/api/v1/client/friends/add/${friendID}`, utils.set.bearer(ServerSocket.users[this.socket.id].token))
            ServerSocket.io.to(this.socket.id).emit("friendAdd", response.data)
        } catch(err) {
            console.log(err)
        }
    }
}