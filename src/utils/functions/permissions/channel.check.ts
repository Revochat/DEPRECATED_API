import UTILS from "../.."
import DB from "../../../database"
import { IChannel} from '../../../database/models/Channel'
import { IUser } from '../../../database/models/User'


export const checkChannelPermissions = async (User: IUser, Channel: IChannel, permissions: string[]) => { // check for channel permissions
    if (Channel.server_id) { // PERMISSIONS CHECK
        var Server = await DB.servers.find.id(Channel.server_id) // Find the server
        if(!Server) throw "Server not found" // Check if the server exists
        if (UTILS.FUNCTIONS.PERMISSIONS.hasServerPermission(User, Server, permissions) === false) { // check in server permissions
            if (UTILS.FUNCTIONS.PERMISSIONS.hasChannelPermission(User, Channel, permissions) === false) { // check in channel permissions
                return false
            }
        }
    } else {
        if (UTILS.FUNCTIONS.PERMISSIONS.hasChannelPermission(User, Channel, permissions) === false) { // check in channel permissions
            return false
        }
    }
    return true
}