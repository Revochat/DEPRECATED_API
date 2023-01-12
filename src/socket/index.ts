import { Socket } from "socket.io"
import axios, {AxiosResponse} from "axios";
import Logger from "../client/logger.client"
import { config } from "../config";
import Server from "../database/models/Server";

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

    add(type: string, name: string, path: string, params: string[], socket: Socket) {
        path = config.api.url + path
        // Get the method from the router structure and translate it to a socket to make request to the API
        ServerSocket.channels[name] = {
            sock: async (data: any ) => {
                try {
                    Logger.debug(`Socket ${name} called by ${ServerSocket.socket.id}`)
                    // Check if data keys are in the tab
                    Object.keys(data).length != params.length ? new Error("Missing data") : null
                    for (let i = 0; i < params.length; i++) {
                        Object.keys(data).forEach(key => {
                            if(key === params[i]) throw `Missing ${params[i]}`
                        })
                    }

                    // Replace for the get method /:variable/ to /variable/ using the params tab
                    // for (let i = 0; i < params.length; i++) {
                    //     path = path.replace(`:${params[i]}`, data[params[i]])
                    // }

                    // Replace /:parameter1/:paramater2 to /variable1/variable2 with params string tab and the data Object
                    if(type == "GET"){
                        for (let i = 0; i < params.length; i++) {
                            path = path.replace(`:${params[i]}`, data[params[i]])
                        }
                        Logger.debug(path)
                    } else {
                        var formData: any = {};
                        Logger.debug(data)
                        // Format the data to send to the API
                        for (let i = 0; i < params.length; i++) {
                            formData[params[i]] = data
                        }

                        Logger.debug(formData)
                    }

                    // Send the request to the API

                    var response: AxiosResponse = await axios({
                        method: type,
                        url: path,
                        data: type == "GET" ? null : formData
                    }) 
                    Logger.debug("Response from API :" + response)
                    Logger.debug(response.data)

                    ServerSocket.socket.emit(name, response.data)
                } catch(err: any) {
                    Logger.error(err)
                    ServerSocket.socket.emit(name, err.data ? err.data : err)
                }  
            },
            name: name,
            params: params,
            path: path,
            type: type
        }
    }

    run(){
        ServerSocket.io.on("connection", (socket: Socket) => {
            ServerSocket.socket = socket
            Logger.debug("New connection from " + socket.id)
            Object.keys(ServerSocket.channels).forEach(key => {
                socket.on(key, ServerSocket.channels[key].sock)
            })
        })
    }
}