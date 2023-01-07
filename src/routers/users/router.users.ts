import { UserInterceptEssentials } from "./intercept.users.essentials"
import { UserInterceptSocials } from "./intercept.users.socials"

export const UserRouter = {
    path: "/client",

    Register: { // Register a new user
        method: "GET",
        path:"/register/:username/:password",
        res: UserInterceptEssentials.register
    },

    Connect: {
        method: "GET",
        path: "/connect/:username/:password",
        res: UserInterceptEssentials.connect
    },

    GetUser: {
        method: "GET",
        path: "/get/user/:token",
        res: UserInterceptEssentials.getUser
    },

    UpdateUsername: {
        method: "GET",
        path: "/update/username/:token/:newusername",
        res: UserInterceptEssentials.update.username
    },
    
    UpdatePassword: {
        method: "GET",
        path: "/update/password/:token/:newpassword",
        res: UserInterceptEssentials.update.password
    },

    // UpdateProfilePicture: {
    //     method: "GET",
    //     path: "/update/profilepicture/:token/:newprofile_picture",
    //     res: UserInterceptEssentials.update.profile_picture
    // },

    UpdateWalletToken: {
        method: "GET",
        path: "/update/wallettoken/:token/:newwallet_token",
        res: UserInterceptEssentials.update.wallet_token
    },

    AddFriend: {
        method: "GET",
        path: "/add/friend/:token/:friend_id",
        res: UserInterceptSocials.addFriend
    },

    RemoveFriend: {
        method: "GET",
        path: "/remove/friend/:token/:friend_id",
        res: UserInterceptSocials.removeFriend
    },

    AddBlocked: {
        method: "GET",
        path: "/add/blocked/:token/:blocked_id",
        res: UserInterceptSocials.addBlocked
    },

    RemoveBlocked: {
        method: "GET",
        path: "/remove/blocked/:token/:blocked_id",
        res: UserInterceptSocials.removeBlocked
    }
}