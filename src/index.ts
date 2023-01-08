import Client from "./client/emitter.client"
import { config }from "./config"
import Database from "./database"
import Controller from "./routers/controller/router.controller"


export * from "./routers"
export * from "./config"
export * from "./client"
export * from "./database"
export * from "./socket"

export default Client

setTimeout(() => {
    // HANDLE DATABASE HERE (MONGOOSE) -> NEED TO BE DONE BEFORE READY EVENT // TO FIX
    Client.emit("ready", new Controller(), Database)
}, config.properties.readyEventTimeout)