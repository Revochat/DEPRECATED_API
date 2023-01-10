import express from "express"
import { Intercept } from "./response.controller";
import { Server } from "http"

import Emitter from "../../client/emitter.client"
import { RouterInterface, Status } from "./interfaces.controller";
import { config } from "../../config";
import Logger from "../../client/logger.client";
import DB_Connect from "../../database/connect.database";
import ServerSocket from "../../socket";

export default class Controller implements RouterInterface { // This is the class that starts the server
    static app: express.Express;
    static port: number;
    static server: Server;
    
    constructor(){
        Controller.port = config.properties.port
        Controller.app = express()
        Controller.app.use(express.json()) // To parse the incoming requests with JSON payloads
        Controller.server = Controller.app.listen(Controller.port)
        Controller.start()
        Logger.success("Server started on port "+Controller.port)
    }

    protected static iterate = (obj: any, name: string = "", path: string = "", socketing: boolean = false, description: string = ""): void => { // This is the function that iterates through the routes
        let method = "GET"
        Object.keys(obj).forEach(key => {
            if(key === "method") method = obj[key].toUpperCase()
            if(key === "path") path += obj[key]
            if(key === "name") name = obj[key]
            if(key === "description") description = obj[key]
            if(key === "socketing") socketing = obj[key]
            if (typeof obj[key] === 'object' && obj[key] !== null)
                this.iterate(obj[key], name, path, socketing, description)
             else if (typeof obj[key] === 'function'){
                if(path.includes("*")) path = "*"
                if(method === "POST") this.app.post(path,  obj[key])
                if(socketing) ServerSocket.add(method, name, path, obj[key].parameters, obj[key].socket)
                else this.app.get(path,  obj[key])
                Logger.info(`Route: [${method}] ${path} [SOCKET] ${socketing} -> ${description}`)
            }
        })
    }

    protected static rules() { // This is the function that sets the API rules
        Controller.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*")
            res.header('Content-Type', 'application/json')
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
                return res.status(200).json({})
            }
            next()
        })
    }

    public static start() { // This is the function that starts the server
        Logger.beautifulSpace()
        Logger.info("Starting server...")
        DB_Connect().then(() => {
            Controller.rules()
            Controller.iterate(Intercept)
            Emitter.emit("readyRoute", this)
            new ServerSocket(Controller.server)
            Logger.beautifulSpace()
        })
    }
    public reload(){ // This is the function that reloads the server
        Controller.server.close()
        Controller.server = Controller.app.listen(Controller.port)
        Controller.start()
    }
    public stop(){ // This is the function that stops the server
        Controller.server.close()
    }
}
