import {findUserbyToken, findServer, findUserbyID, findFriendbyUser, findChannel} from "./find"

export class FUNCTIONS {
    static find = {
        channel: findChannel,

        user: {
            token: findUserbyToken,
            id: findUserbyID,
            friend: findFriendbyUser
        },
        server: findServer
    }
}