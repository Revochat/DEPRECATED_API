import express from "express"
import { Intercept } from "./response.routers";
import { Server } from "http"

import Emitter from "../client/client.emitter"
import { RouterInterface } from "./interfaces.routers";
import { config } from "../config";

export default new class Routers implements RouterInterface { // This is the class that starts the server
    protected app: express.Express;
    protected port: number;
    protected server: Server;
    constructor(){
        this.port = config.properties.port
        this.app = express()
        this.start()
        this.server = this.app.listen(this.port)
    }
    iterate = (obj: any, path: string = ""): void => { // This is the function that iterates through the routes
        Object.keys(obj).forEach(key => {
            if(key === "path") path += obj[key]

            if (typeof obj[key] === 'object' && obj[key] !== null) 
                this.iterate(obj[key], path)
             else if (typeof obj[key] === 'function'){ 
                if(path.includes("*")) path = "*"
                this.app.get(path, obj[key]), Emitter.emit("loadRoute", `${path}`, obj[key])
            }
        })
    }
    public start() { // This is the function that starts the server
        this.iterate(Intercept)
        Emitter.emit("readyRoute", this)
    }
    public reload(){ // This is the function that reloads the server
        this.server.close()
        this.server = this.app.listen(this.port)
    }
    public stop(){ // This is the function that stops the server
        this.server.close()
    }
}
