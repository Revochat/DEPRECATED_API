import axios from 'axios'
import { IMessage } from '../../../database/models/Message'
import ServerSocket from "../../"
import { Socket } from 'socket.io'
import dotenv from 'dotenv'
import { utils } from '../../utils'

dotenv.config()

export class RoleCreateEvent {
    private socket: Socket
    
    constructor(socket: Socket) {
        this.socket = socket
    }

    public async run(roleId: number) {
        try { // ToDo
            // Use this to get socket id   
            const response = await axios.post(`${process.env.BASE_URI}/api/v1/message/send/${roleId}`, {
                //message: message
            },  utils.set.bearer(ServerSocket.users[this.socket.id].token))
            console.log(response.data)
            ServerSocket.io.in(roleId.toString()).emit("roleCreate", response.data)
        } catch(err) {
            console.log("Error while created a role from: " + this.socket.id + " " + err)
        }
    }

}