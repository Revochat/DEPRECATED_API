import axios, { AxiosResponse } from "axios";
import { Socket } from "socket.io";
import dotenv from "dotenv";
import ServerSocket from "../..";
import { utils } from "../../utils";
import Logger from "../../../client/logger.client";

dotenv.config();


export class ChannelsGetEvent {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public async run() {
        try {
            Logger.warn(ServerSocket.users)
            // const channels = ServerSocket.users[this.socket.id].channels
            // const data: AxiosResponse[] = []
            // Logger.debug(`Channels: ${channels}`)
            // channels.forEach(async (channel: number) => {
            //     data.push(await axios.get(`${process.env.BASE_URI}/api/v1/server/get/channels/${channel.toString()}`, utils.set.bearer(ServerSocket.users[this.socket.id].token)))
            // })
            // console.log(data)
            // ServerSocket.io.to(this.socket.id).emit("channelsGet", data)
        } catch(err) {
            console.log(err)
        }
    }
}