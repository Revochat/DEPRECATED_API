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

    static events = [
        "login", 
        "messageCreate", 
        "messageDelete", 
        "friendAdd", 
        "friendRemove", 
        //"friendRequestsReceived", 
        "roleCreate", 
        "roleDelete", 
        "roleGet", 
        "channelCreate", 
        "channelDelete", 
        "channelsGet", 
        "pingUser",
        "disconnect"
    ]

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

                const EventHandler = new SocketEvents(socket) as any

                for(let event of ServerSocket.events){
                    socket.on(event, EventHandler[event].bind(EventHandler))
                }
            })
        } catch(err) {
            Logger.error(err)
        }
    }
}