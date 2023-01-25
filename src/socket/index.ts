import { Socket } from "socket.io"
import axios, {AxiosResponse} from "axios";
import Logger from "../client/logger.client"
import { config } from "../config";
import Server from "../database/models/Server";
import { sock, SocketEvents } from "./events";
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

                Logger.warn(ServerSocket.users)
                if(await utils.verify(socket)) {
                    console.log("Verified")
                    socket.on("messageCreate", sock.messageCreate)
                } else {
                    console.log("Not verified")
                }
                  
                // event handler for login event
                socket.on("login", EventHandler.login.bind(EventHandler)) // bind is used to bind the context of the function to the class instance (EventHandler) so that the function can access the class properties

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