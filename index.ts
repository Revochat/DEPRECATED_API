import Client, {RouterInterface, IDatabase} from "./src";
import Logger from "./src/client/logger.client";
import * as uuid from "uuid"


Client.on("ready", async (routes: RouterInterface, database: IDatabase) => {
    Logger.success("Client ready")
    try {
        var user = await database.users.connect({username: "ByLife", password: "123456"})
        await database.users.create({
            username: "BLF",
            password: "xxx",
            token: uuid.v4(),
            user_id: 123456
        })
        Logger.success(user)
    } catch (error) {
        Logger.error(error)
    }
})