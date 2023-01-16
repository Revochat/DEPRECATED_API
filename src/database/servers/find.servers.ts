import Server from "../models/Server";

export async function ServerFindOne(server_id: number) {
    return Server.findOne({server_id: server_id});
}