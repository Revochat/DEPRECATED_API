import axios, { AxiosResponse } from "axios";
import { Socket } from "socket.io";
import dotenv from "dotenv";
import ServerSocket from "../..";
import DB from "../../../database"
import { utils } from "../../utils";
import Logger from "../../../client/logger.client";
import UTILS from "../../../utils";

dotenv.config();

export class ChannelsGetEvent {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }
    

    public async run() {
        try {            
            const response = await axios.get(`${process.env.BASE_URI}/api/v1/client/get/channels`, utils.set.bearer(ServerSocket.users[this.socket.id].token))
            ServerSocket.io.to(this.socket.id).emit("channelsGet",  response.data.data)
        } catch(err) {
            Logger.error(err)
        }
    }
}