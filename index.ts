import Client, {RouterInterface, IDatabase} from "./src";
import Logger from "./src/client/logger.client";
import axios from "axios";


Client.on("serverReady", async (routes: RouterInterface, database: IDatabase) => {
    Logger.success("Client ready")
    try {
        Logger.debug("Trying to get a channel")

        const channel = await axios.post("http://localhost:3000/api/v1/client/register/", {
            username: "test123",
            password: "test123"
        })

        Logger.debug(channel)
    } catch (error) {
        Logger.error(error)
    }
})
