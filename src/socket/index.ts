import { Socket } from "socket.io"
import Logger from "../client/logger.client"
import { SocketEvents } from "./events";
import { utils } from "./utils";

export default class ServerSocket {
    static io: Socket;
    static users: any = {};
    static channels: any = {};
    static id: any;
    static socket: Socket;

    constructor(server: any){
        try{
            ServerSocket.io = require("socket.io")(server)
        } catch(err) {
            Logger.error(err)
        }
    }


    async run(){
        try {
            ServerSocket.io.on("connection", async (socket: Socket) => {
                Logger.debug("New connection from " + socket.id)

                const EventHandler = new SocketEvents(socket)


                socket.on("messageCreate", EventHandler.messageCreate.bind(EventHandler))

                
                socket.on("login", EventHandler.login.bind(EventHandler))

                socket.on("disconnect", () => {
                    Logger.debug("User disconnected from " + socket.id)
                    delete ServerSocket.users[socket.id]
                })
            })
        } catch(err) {
            Logger.error(err)
        }
    }
}