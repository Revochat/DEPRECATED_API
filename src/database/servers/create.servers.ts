import Server, { IServerModel } from "../models/Server";

export async function ServerCreate(server: IServerModel) { // Create server
    return Server.create(server); // Create server
}