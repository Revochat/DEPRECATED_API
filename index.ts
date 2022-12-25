import Client, {RouterInterface} from "./src";
import Logger from "./src/client/logger.client";


Client.on("ready", (routes: RouterInterface, database: any) => {
    Logger.success("Client ready")
})


