import axios from 'axios'
import { IMessage } from '../../../database/models/Message'
import ServerSocket from "../../"
import Logger from '../../../client/logger.client'
import { Socket } from 'socket.io'
import dotenv from 'dotenv'
import { utils } from '../../utils'

dotenv.config()

export class MessageCreate {
    private socket: Socket
    
    constructor(socket: Socket) {
        this.socket = socket
    }

    public async run(channelID: number, message: IMessage) {
        try {
            // Use this to get socket id  
            const response = await axios.post(`${process.env.BASE_URI}/api/v1/channel/messages/send/${channelID}`, {
                message: message
            },  utils.set.bearer(ServerSocket.users[this.socket.id].token))
            console.log(response.data)
            ServerSocket.io.to(`${channelID}`).emit("messageCreate", response.data)
            console.log("Message sent from: " + this.socket.id)
            
        } catch(err) {
            console.log("Error while sending message from: " + this.socket.id + " " + err)
        }
    }

}