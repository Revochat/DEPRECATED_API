import Server from "../models/Server";

export async function ServerFindUser (user_id: number, server_id: number) {
    return Server.findOne({ where: { id: server_id, user_id: user_id } }); // find the server with the user id and server id in the server table
}