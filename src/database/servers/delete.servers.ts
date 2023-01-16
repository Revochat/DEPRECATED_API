import Server from "../models/Server";

export async function ServerDelete(server_id: number) {
    return Server.deleteOne({server : server_id});
}