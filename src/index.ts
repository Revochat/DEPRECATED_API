import RevoDB, { DB_Modal } from "./database/"
import Client from "./client/client.emitter"
import Routers from "./routers/class.routers"
import { config }from "./config/"

export * from "./database/"
export * from "./routers/"
export * from "./config/"
export * from "./client/"

export default Client

setTimeout(() => {
    Client.emit("ready", Routers, RevoDB)
}, config.properties.readyEventTimeout)

