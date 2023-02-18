import Server from "../models/Server";
import Logger from "../../client/logger.client";

export async function ServerDelete(server_id: number) {
    try {
        return Server.deleteOne({server : server_id});
    } catch (err) {
        Logger.error(err);
    }
}