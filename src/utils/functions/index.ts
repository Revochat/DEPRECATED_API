import {findUserbyToken, findServer, findUserbyID, findFriendbyUser, findChannelID, findChannelFriend, findUserBlocked} from "./find"

export class FUNCTIONS {
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
}