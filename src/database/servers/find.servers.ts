import Server from "../models/Server";
import Logger from "../../client/logger.client";

export async function ServerFindOne(server_id: number) {
    try {
        return Server.findOne({server_id: server_id});
    } catch (err) {
        Logger.error(err);
        return null;
    }
}