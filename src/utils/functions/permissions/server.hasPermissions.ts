import { IChannel} from '../../../database/models/Channel'
import { IUser } from '../../../database/models/User'

export const hasServerPermission = (user: IUser | any, server: any, permission: Array<any>): boolean => { // Check if the user has the permission in the server
    if (user.user_id === server.owner_id) return true // If the user is the
    if (server.permissions) {
        const serverPermissions: any = server.permissions // Get the server permissions
        if (permission.length === 0) {
            if (serverPermissions[permission[0]].roles_id.includes(user.user_id)) return true // If the user has the permission, return true
            if (serverPermissions[permission[0]].user_id.includes(user.user_id)) return true // If the user has the permission, return true
        } else if (permission.length === 1) {
            if (serverPermissions[permission[0]][permission[1]].user_id.includes(user.user_id)) return true // If the user has the permission, return true
            if (serverPermissions[permission[0]][permission[1]].roles_id.includes(user.user_id)) return true // If the user has the permission, return true
        }
    }
    return false
}