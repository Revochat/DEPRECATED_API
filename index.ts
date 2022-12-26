import Client, {RouterInterface, IDatabase} from "./src";
import Logger from "./src/client/logger.client";


Client.on("ready", (routes: RouterInterface, database: IDatabase) => {
    Logger.success("Client ready")
    database.users.create({
        username: "test",
        password: "test",
        token: "test",
        updated_at: new Date().toLocaleString(),
        created_at: new Date().toLocaleString(),
        last_connection: new Date().toLocaleString(),
    })
})


