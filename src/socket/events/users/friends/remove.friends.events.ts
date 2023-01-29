import axios from "axios";
import { Socket } from "socket.io";
import dotenv from "dotenv";
import { utils } from "../../../utils";
import ServerSocket from "../../..";

dotenv.config();

export class FriendRemoveEvent {
    private socket: Socket;
       
    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run(userID: number) {
        try {
            const response = await axios.get(`${process.env.BASE_URI}/api/v1/client/friend/remove/${userID}`, utils.set.bearer(ServerSocket.users[this.socket.id].token))
            ServerSocket.io.to(this.socket.id).emit("friendRemove", response.data)
        } catch(err) {
            console.log(err)
        }
    }
}