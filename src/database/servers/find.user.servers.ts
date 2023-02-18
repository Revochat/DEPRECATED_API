import Server from "../models/Server";
import Logger from "../../client/logger.client";

export async function ServerFindUser (user_id: number, server_id: number) {
    try {
        return Server.findOne({ where: { id: server_id, user_id: user_id } }); // find the server with the user id and server id in the server table
    } catch (err) {
        Logger.error(err);
        return null;
    }
}