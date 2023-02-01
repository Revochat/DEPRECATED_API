import {findUserbyToken, findServer, findUserbyID, findFriendbyUser, findChannelID, findChannelFriend, findUserBlocked, findUserInServer} from "./find"
import {PERMISSIONS} from "./permissions"
import { IUser } from '../../database/models/User';

export class FUNCTIONS {
    static PERMISSIONS = {
        checkIntegrity: PERMISSIONS.checkIntegrity,
        checkChannelPermissions: PERMISSIONS.checkChannelPermissions,

        hasChannelPermission: PERMISSIONS.hasChannelPermission,
        hasServerPermission: PERMISSIONS.hasServerPermission
    }
    static find = {
        channel: {
            id: findChannelID,
            friend: findChannelFriend
        },

        user: {
            blocked: findUserBlocked,
            token: findUserbyToken,
            id: findUserbyID,
            friend: findFriendbyUser
        },
        server: {
            id: findServer,
            member: findUserInServer
        }
    }
    
    static REMOVE_PRIVATE_INFO = (user: any) => {
        user.password = undefined
        user.token = undefined
        user.friends_requests_received = undefined
        user.friends_requests_sent = undefined
        user.blocked = undefined
        user.servers = undefined
        user.channels = undefined
        user.friends = undefined
        return user
    }
}