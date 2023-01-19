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
        params: ["username", "password"],
        res: UserInterceptEssentials.register
    },

    Login: { // Login a user with login credentials
        name: "login",
        description: "Login a user with login credentials",
        method: "POST",
        socketing: false,
        path: "/login",
        params: ["username", "password"],
        res: UserInterceptEssentials.login,
    },

    Connect: { // Connect a user with a user token
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

        // in 1 route update the bio, username, style, banner, ..
        // Username: {
        //     name: "updateusername",
        //     method: "POST",
        //     socketing: false,
        //     description: "Update a user's username",
        //     path: "/username/:token/:newusername",
        //     params: ["token", "newusername"],
        //     res: UserInterceptEssentials.update.username
        // },
        // UpdateProfilePicture: {
        //     name: "updateprofilepicture",
        //     method: "POST",
        //     socketing: false,
        //     description: "Update a user's profile picture",
        //     path: "/profilepicture/:token/:",
        //     params: ["token", "newprofile_picture"],
        //     res: UserInterceptEssentials.update.profile_picture
        // }

        Password: {
            name: "updatepassword",
            method: "POST",
            socketing: false,
            description: "Update a user's password",
            path: "/password/",
            params: ["token", "newpassword"],
            res: UserInterceptEssentials.update.password
        },
        WalletToken: {
            name: "updatewallettoken",
            method: "POST",
            socketing: false,
            description: "Update a user's wallet token",
            path: "/wallettoken/",
            params: ["token", "newwallet_token"],
            res: UserInterceptEssentials.update.wallet_token
        }
    },

    Get: {
        path: "/get",
        User: {
            name: "getuser",
            method: "GET",
            socketing: false,
            description: "Get a user with a token",
            path: "/user/",
            params: ["token"],
            res: UserInterceptEssentials.get.user
        },

        // User_id: {
        //     name: "getuser_id",
        //     method: "POST",
        //     socketing: false,
        //     description: "Get a user with a user_id",
        //     path: "/user_id/",
        //     params: ["user_id"],
        //     res: UserInterceptEssentials.get.user_id
        // },
        // WalletToken: {
        //     name: "getwallettoken",
        //     method: "POST",
        //     socketing: false,
        //     description: "Get a user wallet token",
        //     path: "/wallettoken/",
        //     params: ["wallet_token"],
        //     res: UserInterceptEssentials.get.wallet_token
        // },
        // Username: {
        //     name: "getusername",
        //     method: "POST",
        //     socketing: false,
        //     description: "Get a user username",
        //     path: "/username/",
        //     params: ["username"],
        //     res: UserInterceptEssentials.get.username
        // },
        // Premium_expiration: {
        //     name: "getpremiumexpiration",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user premium expiration",
        //     path: "/premiumexpiration/",
        //     params: ["premium_expiration"],
        //     res: UserInterceptEssentials.get.premium_expiration
        // },
        // ProfilePicture: {
        //     name: "getprofilepicture",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user profile picture",
        //     path: "/profilepicture/",
        //     params: ["profile_picture"],
        //     res: UserInterceptEssentials.get.profile_picture
        // },
        // Message_privacy: {
        //     name: "getmessageprivacy",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user message privacy",
        //     path: "/messageprivacy/",
        //     params: ["message_privacy"],
        //     res: UserInterceptEssentials.get.message_privacy
        // },
        // Status: {
        //     name: "getstatus",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user status",
        //     path: "/status/",
        //     params: ["status"],
        //     res: UserInterceptEssentials.get.status
        // },
        // Updated_at: {
        //     name: "getupdatedat",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user updated at",
        //     path: "/updatedat/",
        //     params: ["updated_at"],
        //     res: UserInterceptEssentials.get.updated_at
        // },
        // Created_at: {
        //     name: "getcreatedat",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user created at",
        //     path: "/createdat/",
        //     params: ["created_at"],
        //     res: UserInterceptEssentials.get.created_at
        // },
        // Last_connection: {
        //     name: "getlastconnection",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user last connection",
        //     path: "/lastconnection/",
        //     params: ["last_connection"],
        //     res: UserInterceptEssentials.get.last_connection
        // },
        // Servers: {
        //     name: "getservers",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user servers",
        //     path: "/servers/",
        //     params: ["servers"],
        //     res: UserInterceptEssentials.get.servers
        // },
        // Channels: {
        //     name: "getchannels",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user channels",
        //     path: "/channels/",
        //     params: ["channels"],
        //     res: UserInterceptEssentials.get.channels
        // },
        // Friends: {
        //     name: "getfriends",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user friends",
        //     path: "/friends/",
        //     params: ["friends"],
        //     res: UserInterceptEssentials.get.friends
        // },
        // Friends_requests_received: {
        //     name: "getfriendsrequestsreceived",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user friends_requests_received",
        //     path: "/friendsrequestsreceived/",
        //     params: ["friends_requests_received"],
        //     res: UserInterceptEssentials.get.friends_requests_received
        // },
        // Friends_requests_sent: {
        //     name: "getfriendsrequestssent",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user friends_requests_sent",
        //     path: "/friendsrequestssent/",
        //     params: ["friends_requests_sent"],
        //     res: UserInterceptEssentials.get.friends_requests_sent
        // },
        // Blocked: {
        //     name: "getblocked",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user blocked",
        //     path: "/blocked/",
        //     params: ["blocked"],
        //     res: UserInterceptEssentials.get.blocked
        // }
    },

    Add: {
        path: "/add",
        Friend: {
            name: "addfriend",
            method: "POST",
            socketing: false,
            description: "Add a friend to a user's friend list",
            path: "/friend/:friend_id",
            params: ["token", "friend_id"],
            res: UserInterceptSocials.addFriend
        },
        Blocked: {
            name: "addblocked",
            method: "POST",
            socketing: false,
            description: "Add a blocked user",
            path: "/blocked/:blocked_id",
            params: ["token", "blocked_id"],
            res: UserInterceptSocials.addBlocked
        },
    },

    Remove: {
        path: "/remove",
        Friend: {
            name: "removefriend",
            method: "POST",
            socketing: false,
            description: "Remove a friend from a user's friend list",
            path: "/friend/:token/:friend_id",
            params: ["token", "friend_id"],
            res: UserInterceptSocials.removeFriend
        },
        Blocked: {
            name: "removeblocked",
            method: "POST",
            socketing: false,
            description: "Remove a blocked user",
            path: "/blocked/:token/:blocked_id",
            params: ["token", "blocked_id"],
            res: UserInterceptSocials.removeBlocked
        }
    },
}