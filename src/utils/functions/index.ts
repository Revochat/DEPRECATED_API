import {findUser, findServer, findUserbyID} from "./find"

export class FUNCTIONS {
    static find = {
        user: findUser,
        userID: findUserbyID,
        server: findServer
    }
}