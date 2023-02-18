import Server, { IServerModel } from "../models/Server";
import Logger from "../../client/logger.client";

export async function ServerCreate(server: IServerModel) { // Create server
    try {
        return Server.create(server);
    } catch (err) {
        Logger.error(err);
    }
}