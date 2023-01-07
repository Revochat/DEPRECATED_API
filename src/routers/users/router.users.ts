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

    UpdateProfilePicture: {
        method: "GET",
        path: "/update/profilepicture/:token/:newprofilepicture",
        res: UserInterceptEssentials.update.profile_picture
    },

    UpdateWalletToken: {
        method: "GET",
        path: "/update/wallettoken/:token/:newwallettoken",
        res: UserInterceptEssentials.update.wallet_token
    },

    AddFriend: {
        method: "GET",
        path: "/add/friend/:token/:friend",
        res: UserInterceptSocials.addFriend
    },

    RemoveFriend: {
        method: "GET",
        path: "/remove/friend/:token/:friend",
        res: UserInterceptSocials.removeFriend
    },

    AddBlocked: {
        method: "GET",
        path: "/add/blocked/:token/:blocked",
        res: UserInterceptSocials.addBlocked
    },

    RemoveBlocked: {
        method: "GET",
        path: "/remove/blocked/:token/:blocked",
        res: UserInterceptSocials.removeBlocked
    },

    AddFriendRequest: {
        method: "GET",
        path: "/add/friendrequest/:token/:friendrequest",
        res: UserInterceptSocials.addFriendRequest
    },

    RemoveFriendRequest: {
        method: "GET",
        path: "/remove/friendrequest/:token/:friendrequest",
        res: UserInterceptSocials.removeFriendRequest
    },

    GetBlocked: {
        method: "GET",
        path: "/get/blocked/:token",
        res: UserInterceptSocials.getBlocked
    },

    GetFriends: {
        method: "GET",
        path: "/get/friends/:token",
        res: UserInterceptSocials.getFriends
    },

    GetChannels: {
        method: "GET",
        path: "/get/channels/:token",
        res: UserInterceptSocials.getChannels
    },

    GetServers: {
        method: "GET",
        path: "/get/servers/:token",
        res: UserInterceptSocials.getServers
    },

    GetFriendRequests: {
        method: "GET",
        path: "/get/friendrequests/:token",
        res: UserInterceptSocials.getFriendRequests
    },

    GetFriendRequestsSent: {
        method: "GET",
        path: "/get/friendrequestssent/:token",
        res: UserInterceptSocials.getFriendRequestsSent
    }
}