import { Socket } from "socket.io"
import axios, {AxiosResponse} from "axios";
import Logger from "../client/logger.client"

export default class ServerSocket {
    static io: Socket;
    static users: any = {};
    static channels: any = {};
    static id: any;

    constructor(server: any){
        try{
            ServerSocket.io = require("socket.io")(server)
        } catch(err) {
            Logger.error(err)
        }
    }

    static add(type: string, name: string, path: string, params: string[], socket: Socket) {
        // Get the method from the router structure and translate it to a socket to make request to the API
        ServerSocket.channels[name] = {
            sock: async (data: Object ) => {
                try {
                    // Check if data keys are in the tab
                    Object.keys(data).length != params.length ? new Error("Missing data") : null
                    for (let i = 0; i < params.length; i++) {
                        Object.keys(data).forEach(key => {
                            if(key === params[i]) throw `Missing ${params[i]}`
                        })
                    }
                    const res: AxiosResponse = type == "GET" ? await axios.get(path, data) : await axios.post(path, data)
                    socket.emit(name, res.data)
                } catch(err) {
                    socket.emit(name, err)
                }  
            },
            name: name,
            params: params,
            path: path,
            type: type
        }

        Logger.debug(ServerSocket.channels)
    }

    static run(){
        ServerSocket.io.on("connection", (socket: Socket) => {
            Object.keys(ServerSocket.channels).forEach(key => {
                socket.on(key, ServerSocket.channels[key]())
            })    
        })
    }
}