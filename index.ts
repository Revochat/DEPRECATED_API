import Client, {RouterInterface, IDatabase} from "./src";
import Logger from "./src/client/logger.client";
import axios from "axios";


Client.on("serverReady", async (routes: RouterInterface, database: IDatabase) => {
    Logger.success("Client ready")
    try {
        Logger.debug("Trying to get a channel")

        const channel = await axios.get("http://localhost:3000/api/v1/channels/123456789012345678901234/123456789012345678901234")
        Logger.debug(channel)
    } catch (error) {
        Logger.error(error)
    }
})
