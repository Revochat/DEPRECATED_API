import Client, {RouterInterface, IDatabase} from "./src";
import Logger from "./src/client/logger.client";
import axios from "axios";


Client.on("ready", async (routes: RouterInterface, database: IDatabase) => {
    Logger.success("Client ready")
    try {

    } catch (error) {
        Logger.error(error)
    }
})
