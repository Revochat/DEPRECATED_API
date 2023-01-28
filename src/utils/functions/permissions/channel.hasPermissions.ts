import { IChannel} from '../../../database/models/Channel'
import { IUser } from '../../../database/models/User'
import { IServer } from '../../../database/models/Server'

export const hasChannelPermission = (user: IUser, channel: IChannel, permission: Array<any>): boolean => { // check channel permissions
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