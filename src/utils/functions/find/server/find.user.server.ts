import { IUser } from '../../../../database/models/User';
import { IServer } from '../../../../database/models/Server';

export const findUserInServer = (user_id: number, Server: IServer) => {
    try {
        if (Server.members.length === 0) return false // no members in server
    
        // get keys of all members in map array
        const keys = Object.keys(Server.members[0])
    
        // check if user_id is in keys
        if (keys.includes(user_id.toString())) return true
    
        return false
    } 
    
    catch (error) {
        throw error
    }
}