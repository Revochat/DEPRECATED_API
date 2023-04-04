import axios from "axios"
import { Socket } from "socket.io"
import ServerSocket from "../.."
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import { IChannelModel } from "../../../database/models/Channel"
import UTILS from "../../../utils"
import { utils } from "../../utils"


export class LoginEvent {
    private socket: Socket
    constructor(socket: Socket) {
        this.socket = socket
    }

    public async run(token: string) {
        try {
            if(!this.socket.id) throw new Error("Socket not found")
            Logger.debug("Login event from " + this.socket.id)
            const User = (await axios.get(`${process.env.BASE_URI}/api/v1/client/connect`, utils.set.bearer(token))).data // Get user data from API
            if(!User) return ServerSocket.io.to(this.socket.id).emit("login", null), this.socket.disconnect(true) // Send null to client if user not found
           
            ServerSocket.users[this.socket.id] = User.data
                ServerSocket.users[this.socket.id].channels.forEach(async (channel: IChannelModel) => {
                    this.socket.join(channel.channel_id.toString()) // Join all channels the user is in (convert channel id to string using toString())
                    Logger.debug("Joining channel " + channel.channel_id)
                    var members = await DB.users.find.many(channel.members)
                    if(members) {
                        for(let i = 0; i < channel.members_count; i++) {
                            channel.members[i] = UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(members[i])
                        }
                    }
                })
            
            if(ServerSocket.users[this.socket.id].servers) { 
                this.socket.join(ServerSocket.users[this.socket.id].servers.map(String)) // Join all channels the user is in (convert channel id to string using map)
            }
            return ServerSocket.io.to(this.socket.id).emit("login", User.data) // Send user data to client
        }
        catch {
            Logger.warn("User not found")
            return ServerSocket.io.to(this.socket.id).emit("login", null), this.socket.disconnect(true) // Send null to client if user not found 
        }
    }
}