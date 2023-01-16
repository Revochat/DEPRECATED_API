import { passwordUpdate, pfpUpdate, usernameUpdate, walletUpdate } from "./update"
import { userLogin, userRegister, userConnect } from "./connect"
import { getUser } from "./get"


export const UserInterceptEssentials = {
    register : userRegister,

    login : userLogin,

    connect : userConnect,

    get: {
        user: getUser
    },

    update : { 
        username : usernameUpdate,
        password : passwordUpdate,
        profile_picture : pfpUpdate,
        wallet_token: walletUpdate,
    }
}