import {findUserbyToken, findServer, findUserbyID, findFriendbyUser, findChannelID, findChannelFriend} from "./find"

export class FUNCTIONS {
    static find = {
        channel: {
            id: findChannelID,
            friend: findChannelFriend
        },

        user: {
            token: findUserbyToken,
            id: findUserbyID,
            friend: findFriendbyUser
        },
        server: findServer
    }
}