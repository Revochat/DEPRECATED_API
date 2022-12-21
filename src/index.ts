import Client from "./client/emitter.client"
import { config }from "./config/"
import Controller from "./routers/controller.routers"

export * from "./routers/"
export * from "./config/"
export * from "./client/"

export default Client

setTimeout(() => {
    // HANDLE DATABASE HERE (MONGOOSE) -> NEED TO BE DONE BEFORE READY EVENT // TO FIX
    Client.emit("ready", Controller, null)
}, config.properties.readyEventTimeout)