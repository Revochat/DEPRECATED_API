import axios from "axios";
import ServerSocket from "../../..";

async function get() {
    try {
        const response = await axios.get(`/api/v1/client/get/user/`, ServerSocket.users[ServerSocket.socket.id].token);
        if(response.data.error) throw new Error(response.data.error);
    } catch(err){
        console.log("Error resolving user")
    }
}