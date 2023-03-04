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

export async function ServerFindMany(server_ids: number[]) { // Find many servers by their ids and return them
    try {
        return Server.find({server_id: {$in: server_ids}});
    } catch (err) {
        Logger.error(err);
        return null;
    }
}