import { Socket } from "socket.io"
import Logger from "../client/logger.client"
import Controller from "../routers/controller/router.controller"
import DB from "../database"

export default class ServerSocket {
    static io: Socket;
    static users: any = {};
    static id: any;
    constructor(server: any){
        try{
            ServerSocket.io = require("socket.io")(server)
            ServerSocket.init()
            setInterval(() => {
                Logger.debug("Socket users: "+Object.keys(ServerSocket.users).length)
                Logger.debug("Socket users: "+Object.keys(ServerSocket.users))
                Logger.debug(ServerSocket.users)
                ServerSocket.io.emit("message", "Hello World")
            }, 10000)
        } catch(err) {
            Logger.error(err)
        }
    }

    static async init(){
        ServerSocket.io.on("connection", (socket: Socket) => {
            Logger.debug("Socket connected: "+socket.id)
            ServerSocket.users[socket.id] = null
            socket.on("disconnect", () => {
                delete ServerSocket.users[socket.id]
                Logger.debug("Socket disconnected: "+socket.id)
            })
            socket.on("login", async (token: string) => {
                try {
                    const User = await DB.users.find.token(token)
                    Logger.debug("User: "+ token)
                    if(!User) ServerSocket.io.to(socket.id).emit("login", null)
                    ServerSocket.users[socket.id] = User
                    Logger.debug(User)
                    ServerSocket.io.to(socket.id).emit("login", User)
                }
                catch(err) {
                    Logger.error(err)
                }
            })
        })
    }
}