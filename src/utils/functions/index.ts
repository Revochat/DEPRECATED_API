import {findUserbyToken, findServer, findUserbyID, findFriendbyUser, findChannelID, findChannelFriend, findUserBlocked, findUserInServer} from "./find"
import {PERMISSIONS} from "./permissions"

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
    
    static removeSensitiveData = (user: any) => {
        delete user.password
        delete user.token
        delete user.friends_requests_received
        delete user.friends_requests_sent
        delete user.blocked
        delete user.servers
        delete user.channels
        delete user.friends
        return user
    }
}