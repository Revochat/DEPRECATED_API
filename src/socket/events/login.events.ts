import socket from ".."
import ServerSocket from ".."
import Logger from "../../client/logger.client"
import DB from "../../database"

export default async (token: string) => {
    try {
        const User = await DB.users.find.token(token)
        Logger.debug("User: "+ token)
        if(!User) ServerSocket.io.to(ServerSocket.socket.id).emit("login", null)
        ServerSocket.users[socket.id] = User
        Logger.debug(User + " " +  ServerSocket.socket.id)
        ServerSocket.io.to(ServerSocket.socket.id).emit("login", User)
    }
    catch(err) {
        Logger.error(err)
    }
}