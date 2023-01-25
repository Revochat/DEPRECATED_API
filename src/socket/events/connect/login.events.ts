import { Socket } from "socket.io"
import ServerSocket from "../.."
import Logger from "../../../client/logger.client"
import DB from "../../../database"


export class LoginEvent {
    private socket: Socket
    constructor(socket: Socket){
        this.socket = socket
    }

    public async run(token: string){
        try {
            if(!this.socket.id) throw new Error("Socket not found")
            Logger.debug("Login event from " + this.socket)
            const User = await DB.users.find.token(token)
            Logger.debug("User: "+ token)
            if(!User) ServerSocket.io.to(this.socket.id).emit("login", null)
            ServerSocket.users[this.socket.id] = User
            Logger.debug(ServerSocket.users)
            if(ServerSocket.users[this.socket.id].channels) {
                this.socket.join(ServerSocket.users[this.socket.id].channels.map(String))
            }
            ServerSocket.io.to(this.socket.id).emit("login", User)        
        }
        catch(err) {
            Logger.error(err)
        }
    }
}