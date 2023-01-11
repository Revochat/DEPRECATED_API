import { UserInterceptEssentials } from "./intercept.users.essentials"
import { UserInterceptSocials } from "./intercept.users.socials"

export const UserRouter = {
    path: "/client",

    Register: { // Register a new user
        name: "register",
        description: "Register a new user",
        method: "POST",
        socketing: false,
        path:"/register/",
        res: UserInterceptEssentials.register
    },

    Login: {
        name: "login",
        description: "Login a user with login credentials",
        method: "POST",
        socketing: false,
        path: "/login/",
        res: UserInterceptEssentials.login,
    },

    Connect: {
        name: "conn",
        description: "Connect a user with a user token",
        method: "POST",
        socketing: true,
        path: "/connect/",
        params: ["token"],
        res: UserInterceptEssentials.connect,
    },

    GetUser: {
        name: "getuser",
        method: "POST",
        socketing: true,
        description: "Get a user with a token",
        path: "/get/user/",
        res: UserInterceptEssentials.getUser
    },

    UpdateUsername: {
        name: "updateusername",
        method: "GET",
        socketing: true,
        description: "Update a user's username",
        path: "/update/username/:token/:newusername",
        res: UserInterceptEssentials.update.username
    },
    
    UpdatePassword: {
        name: "updatepassword",
        method: "GET",
        socketing: true,
        description: "Update a user's password",
        path: "/update/password/:token/:newpassword",
        res: UserInterceptEssentials.update.password
    },

    // UpdateProfilePicture: { 
    //     method: "GET",
    //     path: "/update/profilepicture/:token/:newprofile_picture",
    //     res: UserInterceptEssentials.update.profile_picture
    // },

    UpdateWalletToken: {
        name: "walletlist",
        method: "GET",
        socketing: true,
        description: "Update a user's wallet token",
        path: "/update/wallettoken/:token/:newwallet_token",
        res: UserInterceptEssentials.update.wallet_token
    },

    AddFriend: {
        name: "addfriend",
        method: "GET",
        socketing: true,
        description: "Add a friend to a user's friend list",
        path: "/add/friend/:token/:friend_id",
        res: UserInterceptSocials.addFriend
    },

    RemoveFriend: {
        name: "removefriend",
        method: "GET",
        socketing: true,
        description: "Remove a friend from a user's friend list",
        path: "/remove/friend/:token/:friend_id",
        res: UserInterceptSocials.removeFriend
    },

    AddBlocked: {
        name: "addblocked",
        method: "GET",
        socketing: true,
        description: "Add a blocked user",
        path: "/add/blocked/:token/:blocked_id",
        res: UserInterceptSocials.addBlocked
    },

    RemoveBlocked: {
        name: "removeblocked",
        method: "GET",
        socketing: true,
        description: "Remove a blocked user",
        path: "/remove/blocked/:token/:blocked_id",
        res: UserInterceptSocials.removeBlocked
    }
}