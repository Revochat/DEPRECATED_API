import ServerSocket from ".."
import verifySocket from "./verify.utils"

export default async () : Promise<void>=> {
    if(await verifySocket()) delete ServerSocket.users[ServerSocket.socket.id]
}