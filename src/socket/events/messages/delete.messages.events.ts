import axios from 'axios'
import { IMessage } from '../../../database/models/Message'
import ServerSocket from "../../"

export default async (channelID: number, messageID: number) => {
    try {
        const response = await axios.get(`/api/v1/channel/messages/send/${channelID}/${messageID}`,  ServerSocket.users[ServerSocket.socket.id].token)
        if(response.data.error) throw new Error(response.data.error)

        ServerSocket.io.to(ServerSocket.socket.id).emit("messageDelete", response.data) // Only emit to user, need to create a way to emit to all users in a channel

        
    } catch(err) {
        console.log("Error while sending message from: " + ServerSocket.socket.id)
    }
}