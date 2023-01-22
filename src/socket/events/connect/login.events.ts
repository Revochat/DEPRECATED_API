import { Socket } from "socket.io"
import socket from "../.."
import ServerSocket from "../.."
import Logger from "../../../client/logger.client"
import DB from "../../../database"

export default async (token: string) => {
    try {
        const socket: Socket = this as any
        console.log(socket)
        const User = await DB.users.find.token(token)
        Logger.debug("User: "+ token)
        if(!User) ServerSocket.io.to(socket.id).emit("login", null)
        ServerSocket.users[socket.id] = User
        Logger.debug(ServerSocket.users)
        // if(ServerSocket.users[socket.id].channels) {
        //     for(const channel of ServerSocket.users[socket.id].channels){
        //         ServerSocket.socket.join(channel)
        //     }
        // }
        ServerSocket.io.to(socket.id).emit("login", User)        
    }
    catch(err) {
        Logger.error(err)
    }
}