import UTILS from "../.."
import DB from "../../../database"
import { IChannel} from '../../../database/models/Channel'
import { IUser } from '../../../database/models/User'

export const hasChannelPermissions = async (User: IUser, Channel: IChannel, permissions: string[]) => { // check the permissions of a user in a channel (server or not)
    try {
        if (Channel.server_id) { // PERMISSIONS CHECK
            var Server = await DB.servers.find.id(Channel.server_id) // Find the server
            if(!Server) throw "Server not found" // Check if the server exists
            if (UTILS.FUNCTIONS.CHECK.SERVER.PERMISSIONS(User, Server, permissions) === false) { // check in server permissions
                if (checkChannelPermission(User, Channel, permissions) === false) { // check in channel permissions
                    return false
                }
            }
        } else {
            if (checkChannelPermission(User, Channel, permissions) === false) { // check in channel permissions
                return false
            }
        }
        return true
    }

    catch (error) {
        throw error
    }
}

const checkChannelPermission = (user: IUser, channel: IChannel, permission: Array<any>): boolean => { // check the channel permissions
    try {
    // Check if the user has the permission
    if (user.user_id === channel.owner_id) return true // If the user is the owner of the channel, return true

    if (channel.permissions) {
        if (channel.permissions.admin.user_id.includes(user.user_id)) return true // If the user has an admin perm, return true
        if (channel.permissions.admin.roles_id.includes(user.user_id)) return true // If the user has an admin perm, return true

        const channelPermissions: any = channel.permissions // Get the channel permissions

        if (permission.length === 0) {
            if (channelPermissions[permission[0]].roles_id.includes(user.user_id)) return true // If the user has the permission, return true
            if (channelPermissions[permission[0]].user_id.includes(user.user_id)) return true // If the user has the permission, return true
        } else if (permission.length === 1) {
            if (channelPermissions[permission[0]][permission[1]].user_id.includes(user.user_id)) return true // If the user has the permission, return true
            if (channelPermissions[permission[0]][permission[1]].roles_id.includes(user.user_id)) return true // If the user has the permission, return true
        }
    }
    return false
    } 
    
    catch (error) {
        throw error
    }
}