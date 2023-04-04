import axios, { AxiosError } from 'axios'
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
            ServerSocket.io.to(this.socket.id).emit("messageCreate", "Sending message in channel: " + channelID + " with message: " + message + "")
            const response = axios.post(`${process.env.BASE_URI}/api/v1/message/send/${channelID}`, {
                message: message
            },  utils.set.bearer(ServerSocket.users[this.socket.id].token)).then((response) => {
                ServerSocket.io.to(channelID.toString()).emit("messageCreate", response.data.data)
            }).catch((err: AxiosError) => {
                ServerSocket.io.to(this.socket.id).emit("messageCreate", err.response?.data)
            })
            
        } catch(err: unknown | AxiosError) {
            console.log("Error while sending message from: " + this.socket.id + " " + err)
            if(err instanceof AxiosError)
                ServerSocket.io.to(this.socket.id).emit("messageCreate", err.response?.data)
            else 
                ServerSocket.io.to(this.socket.id).emit("messageCreate", "An error occured while sending message in channel: " + channelID.toString() + " with message: " + message + "")
        }
    }
}