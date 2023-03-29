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
            const channels = ServerSocket.users[this.socket.id].channels
            
            channels.forEach(async (channel: any) => {
                var members = await DB.users.find.many(channel.members)
                if(!members) return
                for(let i = 0; i < channel.members_count; i++) {
                    channel.members[i] = UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(members[i])
                }
            })
            ServerSocket.io.to(this.socket.id).emit("channelsGet",  channels)
        } catch(err) {
            Logger.error(err)
        }
    }
}