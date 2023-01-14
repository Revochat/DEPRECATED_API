import Client, {RouterInterface, IDatabase} from "./src";
import Logger from "./src/client/logger.client";
import axios from "axios";
import DB from "./src/database";


Client.on("serverReady", async (routes: RouterInterface, database: IDatabase) => {
    Logger.success("Client ready")
    try {
        // Logger.debug("Trying to get a channel")

        // const channel = await axios.post("http://localhost:3000/api/v1/client/register/", {
        //     username: "test123",
        //     password: "test123"
        // })

        // Logger.debug(channel)

        // create a default role for the channel if it doesn't exist
        
        // check if the role exists
        var Role = await DB.role.find.id(0)
        if (!Role) {
            // create the role
            Role = await DB.role.create({
                role_id: 0,
                role_name: "default",
                role_color: "#000000",
                role_position: 0,
                role_members: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
        }

    } catch (error) {
        Logger.error(error)
    }
})
