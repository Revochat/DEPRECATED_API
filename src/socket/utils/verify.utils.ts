import ServerSocket from ".."

export default async () : Promise<boolean> => {
    if(ServerSocket.users[ServerSocket.socket.id]) return true;
    return false;
}