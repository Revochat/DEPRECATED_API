import { IChannel} from '../../../database/models/Channel'
import { IUser } from '../../../database/models/User'

export const hasServerPermission = (user: IUser | any, server: any, permission: Array<any>): boolean => { // Check if the user has the permission in the server
    if (user.user_id === server.owner_id) return true // If the user is the

    // fetch roles of user and test if they have the permission
    
    return false
}