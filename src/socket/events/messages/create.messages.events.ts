import axios from 'axios'
import ServerSocket from "../../"
import { Socket } from 'socket.io'
import dotenv from 'dotenv'
import { utils } from '../../utils'
import Logger from '../../../client/logger.client'

dotenv.config()

export class MessageCreateEvent {
    private socket: Socket
    
    constructor(socket: Socket) {
        this.socket = socket
    }

    public async run(channelID: number, message: string) {
        try {
            // Use this to get socket id 
            Logger.warn(channelID + " " + message + " " + ServerSocket.users[this.socket.id].token) 
            const response = await axios.post(`${process.env.BASE_URI}/api/v1/message/send/${channelID}`, {
                message: message 
            },  utils.set.bearer(ServerSocket.users[this.socket.id].token))
            ServerSocket.io.to(channelID.toString()).emit("messageCreate", response.data)
            console.log("Message sent in channel: " + channelID)
            Logger.info("Message sent from: " + this.socket.id)
        } catch(err) {
            console.log("Error while sending message from: " + this.socket.id + " " + err)
        }
    }
}