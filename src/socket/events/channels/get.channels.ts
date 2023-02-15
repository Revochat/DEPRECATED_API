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
            const channels = ServerSocket.users[this.socket.id].channels
            var userChannels: any = []
            Logger.debug(`Channels: ${channels}`)
            await channels.forEach(async (channel: any) => {
                ServerSocket.io.to(this.socket.id).emit("channelsGet",  (await axios.get(`${process.env.BASE_URI}/api/v1/channel/get/${channel.channel_id.toString()}`, utils.set.bearer(ServerSocket.users[this.socket.id].token))).data.data)
            })
        } catch(err) {
            Logger.error(err)
        }
    }
}