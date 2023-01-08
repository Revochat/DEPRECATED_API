import { passwordUpdate, pfpUpdate, usernameUpdate, walletUpdate } from "./update"
import { userLogin, userRegister } from "./connect"
import { getUser } from "./get"


export const UserInterceptEssentials = {
    register : userRegister,

    connect : userLogin,

    getUser : getUser,

    update : { 
        username : usernameUpdate,
        password : passwordUpdate,
        profile_picture : pfpUpdate,
        wallet_token: walletUpdate,
    }
}