import {findUserbyToken, findServer, findUserbyID, findFriendbyUser, findChannelID, findChannelFriend, findUserBlocked} from "./find"
import {PERMISSIONS} from "./permissions"

export class FUNCTIONS {
    static permissions = {
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
        server: findServer
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