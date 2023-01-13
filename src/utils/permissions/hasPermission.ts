import { IChannel, IChannelPermission } from '../../database/models/Channel'
import { IUser } from '../../database/models/User'

export const PERMISSIONS = {
    hasPermission: (user: IUser, channel: IChannel, permission: string): boolean => {
        // Check if the user has the permission
        if (user.user_id === channel.owner_id) return true // If the user is the owner of the channel, return true
        // if (channel.permissions && channel[permission] ) return true // If the channel has the permission, return true
        return false
    }
}