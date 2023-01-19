import { Socket } from "socket.io"
import axios, {AxiosResponse} from "axios";
import Logger from "../client/logger.client"
import { config } from "../config";
import Server from "../database/models/Server";
import { sock } from "./events";
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
                ServerSocket.socket = socket
                Logger.debug("New connection from " + socket.id)
                
                socket.on("login", sock.login)

                if(await utils.verify()){
                    socket.on("messageCreate", () => {})
                }

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