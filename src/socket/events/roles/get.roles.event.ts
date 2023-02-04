import axios from 'axios'
import { IMessage } from '../../../database/models/Message'
import ServerSocket from "../../"
import { Socket } from 'socket.io'
import dotenv from 'dotenv'
import { utils } from '../../utils'

dotenv.config()

export class RoleGetEvent {
    private socket: Socket
    
    constructor(socket: Socket) {
        this.socket = socket
    }

    public async run(roleID: number) {
        try {
            // Use this to get socket id  
            const response = await axios.get(`${process.env.BASE_URI}/api/v1/role/get/${roleID}`,  
                utils.set.bearer(ServerSocket.users[this.socket.id].token)
            )

            ServerSocket.io.in(roleID.toString()).emit("roleGet", response.data)
        } catch(err) {
            console.log("Error while geting role " + this.socket.id + " " + err)
        }
    }

}