import express from "express"
import { Intercept } from "./response.routers";
import { Server } from "http"

import Emitter from "../client/emitter.client"
import { RouterInterface, Status } from "./interfaces.routers";
import { config } from "../config";
import Logger from "../client/logger.client";
import DB_Connect from "../database/connect.database";

export default new class Controller implements RouterInterface { // This is the class that starts the server
    static  app: express.Express;
    static  port: number;
    static server: Server;
    constructor(){
        Controller.port = config.properties.port
        Controller.app = express()
        Controller.server = Controller.app.listen(Controller.port)
        Controller.start()
        Logger.success("Server started on port "+Controller.port)
    }

    protected static iterate = (obj: any, path: string = ""): void => { // This is the function that iterates through the routes
        let method = "GET"
        Object.keys(obj).forEach(key => {
            if(key === "method") method = obj[key].toUpperCase()
            if(key === "path") path += obj[key]
            if (typeof obj[key] === 'object' && obj[key] !== null) 
                this.iterate(obj[key], path)
             else if (typeof obj[key] === 'function'){ 
                if(path.includes("*")) path = "*"
                if(method === "POST") this.app.post(path,  obj[key])
                else this.app.get(path,  obj[key])
                Logger.info("Route: "+method+" "+path)
            }
        })
    }

    protected static rules() { // This is the function that sets the API rules
        Controller.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*")
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
