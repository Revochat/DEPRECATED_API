import Client, {RouterInterface, IDatabase} from "./src";
import Logger from "./src/client/logger.client";
import bcrypt from "bcrypt";

Client.on("ready", async (routes: RouterInterface, database: IDatabase) => {
    Logger.success("Client ready")
    try {
        var user = await database.users.connect({username: "ByLife", password: "123456"})
        Logger.success(user)
    } catch (error) {
        Logger.error(error)
    }
})


