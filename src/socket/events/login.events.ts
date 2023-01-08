import socket from ".."
import ServerSocket from ".."
import Logger from "../../client/logger.client"
import DB from "../../database"

export = async (token: string) => {
    try {
        const User = await DB.users.find.token(token)
        Logger.debug("User: "+ token)
        if(!User) ServerSocket.io.to(socket.id).emit("login", null)
        ServerSocket.users[socket.id] = User
        Logger.debug(User)
        setInterval(() => {
            ServerSocket.io.to(socket.id).emit("login", User)
        }, 1000)
        

    }
    catch(err) {
        Logger.error(err)
    }
}