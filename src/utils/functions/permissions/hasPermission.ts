import { IChannel, IChannelPermission } from '../../../database/models/Channel'
import { IUser } from '../../../database/models/User'

export const PERMISSIONS = {
    hasPermission: (user: IUser, channel: IChannel, permission: Array<any>): boolean => { // Check if the user has the permission in the channel
        // Check if the user has the permission
        if (user.user_id === channel.owner_id) return true // If the user is the owner of the channel, return true
        if (user.user_id === channel.server_id) return true // If the user is the owner of the server, return true

        if (channel.permissions) {
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
        // Check if the user has the permission
}