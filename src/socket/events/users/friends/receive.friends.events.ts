import axios from "axios";
import { Socket } from "socket.io";
import dotenv from "dotenv";
import { utils } from "../../../utils";
import ServerSocket from "../../..";

dotenv.config();

export class FriendRequestsReceivedEvent {
    private socket: Socket;
       
    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run() {
        try {
            const response = await axios.get(`${process.env.BASE_URI}/api/v1/client/get/friendsrequestsreceived/`, utils.set.bearer(ServerSocket.users[this.socket.id].token))
            ServerSocket.io.to(this.socket.id).emit("friendRequestReceived", response.data)
        } catch(err) {
            console.log(err)
        }
    }
}