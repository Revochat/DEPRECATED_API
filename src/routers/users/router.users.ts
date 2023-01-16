import { UserInterceptEssentials } from "./intercept.users.essentials"
import { UserInterceptSocials } from "./intercept.users.socials"

export const UserRouter = {
    path: "/client",

    Register: { // Register a new user
        name: "register",
        description: "Register a new user",
        method: "POST",
        socketing: false,
        path:"/register",
        res: UserInterceptEssentials.register
    },

    Login: {
        name: "login",
        description: "Login a user with login credentials",
        method: "POST",
        socketing: false,
        path: "/login",
        res: UserInterceptEssentials.login,
    },

    Connect: {
        name: "conn",
        description: "Connect a user with a user token",
        method: "POST",
        socketing: true,
        path: "/connect",
        params: ["token"],
        res: UserInterceptEssentials.connect,
    },

    Update: {
        path: "/update",
        Username: {
            name: "updateusername",
            method: "GET",
            socketing: true,
            description: "Update a user's username",
            path: "/username/:token/:newusername",
            res: UserInterceptEssentials.update.username
        },
        Password: {
            name: "updatepassword",
            method: "GET",
            socketing: true,
            description: "Update a user's password",
            path: "/password/:token/:newpassword",
            res: UserInterceptEssentials.update.password
        },
        WalletToken: {
            name: "updatewallettoken",
            method: "GET",
            socketing: true,
            description: "Update a user's wallet token",
            path: "/wallettoken/:token/:newwallet_token",
            res: UserInterceptEssentials.update.wallet_token
        },
        UpdateProfilePicture: {
            name: "updateprofilepicture",
            method: "GET",
            socketing: true,
            description: "Update a user's profile picture",
            path: "/profilepicture/:token/:newprofile_picture",
            res: UserInterceptEssentials.update.profile_picture
        }
    },

    Get: {
        path: "/get",
        User: {
            name: "getuser",
            method: "POST",
            socketing: true,
            description: "Get a user with a token",
            path: "/user/",
            res: UserInterceptEssentials.get.user
        },
    },

    Add: {
        path: "/add",
        Friend: {
            name: "addfriend",
            method: "GET",
            socketing: true,
            description: "Add a friend to a user's friend list",
            path: "/friend/:token/:friend_id",
            res: UserInterceptSocials.addFriend
        },
        Blocked: {
            name: "addblocked",
            method: "GET",
            socketing: true,
            description: "Add a blocked user",
            path: "/blocked/:token/:blocked_id",
            res: UserInterceptSocials.addBlocked
        },
    },

    Remove: {
        path: "/remove",
        Friend: {
            name: "removefriend",
            method: "GET",
            socketing: true,
            description: "Remove a friend from a user's friend list",
            path: "/friend/:token/:friend_id",
            res: UserInterceptSocials.removeFriend
        },
        Blocked: {
            name: "removeblocked",
            method: "GET",
            socketing: true,
            description: "Remove a blocked user",
            path: "/blocked/:token/:blocked_id",
            res: UserInterceptSocials.removeBlocked
        }
    },
}