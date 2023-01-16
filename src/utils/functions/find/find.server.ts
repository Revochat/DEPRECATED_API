import DB from "../../../database/"

// Find server by server_id and return server object if found or throw error if not found
export async function findServer(server_id: number) { 
    var Server = await DB.servers.find.id(server_id) // Find server in database
    if (!Server) throw "Server not found" // If server is not found, throw an error
    return Server // Return server
}