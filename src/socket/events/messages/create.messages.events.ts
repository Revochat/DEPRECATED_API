import axios from 'axios'
import { IMessage } from '../../../database/models/Message'
import ServerSocket from "../../"
import Logger from '../../../client/logger.client'
import { Socket } from 'socket.io'

export const MessageCreate = async function (this: { login: (token: string) => Promise<void>}, channelID: number, message: IMessage) {
    try {
        // Use this to get socket id
        const socket: Socket = this as any
        Logger.error(socket.id)        
        const response = await axios.post(`http://localhost:3000/api/v1/channel/messages/send/${channelID}`, {
            message: message
        },  ServerSocket.users[socket.id].token)
        console.log(response.data)
        ServerSocket.io.to(`${channelID}`).emit("messageCreate", response.data) // Only emit to user, need to create a way to emit to all users in a channel
        console.log("Message sent from: " + ServerSocket.socket.id)
        
    } catch(err) {
        console.log("Error while sending message from: " + ServerSocket.socket.id + " " + err)
    }
}
