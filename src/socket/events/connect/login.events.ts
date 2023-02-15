import axios from "axios"
import { Socket } from "socket.io"
import ServerSocket from "../.."
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import { utils } from "../../utils"


export class LoginEvent {
    private socket: Socket
    constructor(socket: Socket){
        this.socket = socket
    }

    public async run(token: string){
        try {
            if(!this.socket.id) throw new Error("Socket not found")
            Logger.debug("Login event from " + this.socket)
            const User =  (await axios.get(`${process.env.BASE_URI}/api/v1/client/connect`, utils.set.bearer(token))).data// Get user data from API
            if(!User) return ServerSocket.io.to(this.socket.id).emit("login", null) // Send null to client if user not found
            if(!User.data) return ServerSocket.io.to(this.socket.id).emit("login", null) // Send null to client if user not found
            ServerSocket.users[this.socket.id] = User.data
            console.log(User.data)
            // if(ServerSocket.users[this.socket.id].channels) { 
            //     this.socket.join(ServerSocket.users[this.socket.id].channels.map(String)) // Join all channels the user is in (convert channel id to string using map)
            // }
            // if(ServerSocket.users[this.socket.id].servers) { 
            //     this.socket.join(ServerSocket.users[this.socket.id].servers.map(String)) // Join all channels the user is in (convert channel id to string using map)
            // }
            ServerSocket.io.to(this.socket.id).emit("login", User.data) // Send user data to client
        }
        catch(err) {
            Logger.error(err)
        }
    }
}