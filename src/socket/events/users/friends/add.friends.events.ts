import axios from "axios";
import { Socket } from "socket.io";
import dotenv from "dotenv";
import { utils } from "../../../utils";
import ServerSocket from "../../..";
import Logger from "../../../../client/logger.client";

dotenv.config();

export class FriendAddEvent {
    private socket: Socket;
       
    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run(friendID: number) {
        try {
            const response = await axios.get(`${process.env.BASE_URI}/api/v1/client/friends/add/${friendID}`, utils.set.bearer(ServerSocket.users[this.socket.id].token))
            if(!response.data) return ServerSocket.io.to(this.socket.id).emit("friendAdd", null)
            if(!response.data.data) return ServerSocket.io.to(this.socket.id).emit("friendAdd", null)
            return ServerSocket.io.to(this.socket.id).emit("friendAdd", response.data.data)
        } catch(err) {
            console.log(err)
        }
    }
}