import { Socket } from "socket.io"
import Logger from "../client/logger.client"
import Controller from "../routers/controller/router.controller"

export default class ServerSocket {
    static io: Socket;

    constructor(server: any){
        ServerSocket.io = require("socket.io")(server)
        ServerSocket.io.on("connection", (socket: Socket) => {
            Logger.debug("Socket connected: "+socket.id)
            socket.on("disconnect", () => {
                Logger.debug("Socket disconnected: "+socket.id)
            })
        })
    }
}