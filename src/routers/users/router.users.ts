import { UserIntercept } from "./intercept.users"

export const UserRouter = {
    path: "/client",

    Register: { // Register a new user
        name: "register",
        description: "Register a new user",
        method: "POST",
        socketing: false,
        path:"/register",
        params: ["username", "password"],
        res: UserIntercept.register
    },

    Login: { // Login a user with login credentials
        name: "login",
        description: "Login a user with login credentials",
        method: "POST",
        socketing: false,
        path: "/login",
        params: ["username", "password"],
        res: UserIntercept.login,
    },

    Connect: { // Connect a user with a user token
        name: "conn",
        description: "Connect a user with a user token",
        method: "POST",
        socketing: true,
        path: "/connect",
        params: ["token"],
        res: UserIntercept.connect,
    },

    Update: {
        path: "/update",

        Status: {
            name: "updatestatus",
            method: "POST",
            socketing: false,
            description: "Update a user's status",
            path: "/status/",
            params: ["token", "newstatus"],
            res: UserIntercept.update.status
        },
        Username: {
            name: "updateusername",
            method: "GET",
            socketing: false,
            description: "Update a user's username",
            path: "/username/:newusername",
            params: ["token", "newusername"],
            res: UserIntercept.update.username
        },
        // UpdateProfilePicture: {
        //     name: "updateprofilepicture",
        //     method: "POST",
        //     socketing: false,
        //     description: "Update a user's profile picture",
        //     path: "/profilepicture/",
        //     params: ["token", "newprofile_picture"],
        //     res: UserIntercept.update.avatar
        // },
        Password: {
            name: "updatepassword",
            method: "POST",
            socketing: false,
            description: "Update a user's password",
            path: "/password/",
            params: ["token", "newpassword"],
            res: UserIntercept.update.password
        },
        Wallet_token: {
            name: "updatewallettoken",
            method: "POST",
            socketing: false,
            description: "Update a user's wallet token",
            path: "/wallettoken/",
            params: ["token", "newwallet_token"],
            res: UserIntercept.update.wallet_token
        },
        Channels: {
            name: "updatechannels",
            method: "POST",
            socketing: false,
            description: "Update a user's channels order",
            path: "/channels/",
            params: ["token", "newchannels"],
            res: UserIntercept.update.channels
        },
        Servers: {
            name: "updateservers",
            method: "POST",
            socketing: false,
            description: "Update a user's servers order",
            path: "/servers/",
            params: ["token", "newservers"],
            res: UserIntercept.update.servers
        }
    },

    Get: {
        path: "/get",
        User_token: {
            name: "getuser_token",
            method: "GET",
            socketing: false,
            description: "Get a user with a token",
            path: "/user/token",
            params: ["token"],
            res: UserIntercept.get.user
        },
        Wallet_token: {
            name: "getwallettoken",
            method: "POST",
            socketing: false,
            description: "Get a user wallet token",
            path: "/wallettoken/",
            params: ["wallet_token"],
            res: UserIntercept.get.wallet_token
        },
        Username: {
            name: "getusername",
            method: "POST",
            socketing: false,
            description: "Get a user username",
            path: "/username/",
            params: ["username"],
            res: UserIntercept.get.username
        },
        Premium_expiration: {
            name: "getpremiumexpiration",
            method: "GET",
            socketing: false,
            description: "Get a user premium expiration",
            path: "/premiumexpiration/",
            params: ["premium_expiration"],
            res: UserIntercept.get.premium_expiration
        },
        Avatar: {
            name: "getavatar",
            method: "GET",
            socketing: false,
            description: "Get a user avatar",
            path: "/avatar/",
            params: ["avatar"],
            res: UserIntercept.get.avatar
        },
        Message_privacy: {
            name: "getmessageprivacy",
            method: "GET",
            socketing: false,
            description: "Get a user message privacy",
            path: "/messageprivacy/",
            params: ["message_privacy"],
            res: UserIntercept.get.message_privacy
        },
        Status: {
            name: "getstatus",
            method: "GET",
            socketing: false,
            description: "Get a user status",
            path: "/status/",
            params: ["status"],
            res: UserIntercept.get.status
        },
        Updated_at: {
            name: "getupdatedat",
            method: "GET",
            socketing: false,
            description: "Get a user updated at",
            path: "/updatedat/",
            params: ["updated_at"],
            res: UserIntercept.get.updated_at
        },
        Created_at: {
            name: "getcreatedat",
            method: "GET",
            socketing: false,
            description: "Get a user created at",
            path: "/createdat/",
            params: ["created_at"],
            res: UserIntercept.get.created_at
        },
        Last_connection: {
            name: "getlastconnection",
            method: "GET",
            socketing: false,
            description: "Get a user last connection",
            path: "/lastconnection/",
            params: ["last_connection"],
            res: UserIntercept.get.last_connection
        },
        Servers: {
            name: "getservers",
            method: "GET",
            socketing: false,
            description: "Get a user servers",
            path: "/servers/",
            params: ["servers"],
            res: UserIntercept.get.servers
        },
        Channels: {
            name: "getchannels",
            method: "GET",
            socketing: false,
            description: "Get a user channels",
            path: "/channels/",
            params: ["channels"],
            res: UserIntercept.get.channels
        },
        Friends: {
            name: "getfriends",
            method: "GET",
            socketing: false,
            description: "Get a user friends",
            path: "/friends/",
            params: ["friends"],
            res: UserIntercept.get.friends
        },
        Friends_requests_received: {
            name: "getfriendsrequestsreceived",
            method: "GET",
            socketing: false,
            description: "Get a user friends_requests_received",
            path: "/friendsrequestsreceived/",
            params: ["friends_requests_received"],
            res: UserIntercept.get.friends_requests_received
        },
        Friends_requests_sent: {
            name: "getfriendsrequestssent",
            method: "GET",
            socketing: false,
            description: "Get a user friends_requests_sent",
            path: "/friendsrequestssent/",
            params: ["friends_requests_sent"],
            res: UserIntercept.get.friends_requests_sent
        },
        Blocked: {
            name: "getblocked",
            method: "GET",
            socketing: false,
            description: "Get a user blocked",
            path: "/blocked/",
            params: ["blocked"],
            res: UserIntercept.get.blocked
        }
    },

    Friends: {
        path: "/friends",
        Add: {
            name: "addfriend",
            method: "GET",
            socketing: false,
            description: "Add a friend",
            path: "/add/:friend_id",
            params: ["token", "friend_id"],
            res: UserIntercept.friends.add
        },
        Remove: {
            name: "removefriend",
            method: "GET",
            socketing: false,
            description: "Remove a friend",
            path: "/remove/:friend_id",
            params: ["token", "friend_id"],
            res: UserIntercept.friends.remove
        }
    },

    Blocked: {
        path: "/blocked",
        Add: {
            name: "addblocked",
            method: "GET",
            socketing: false,
            description: "Add a blocked",
            path: "/add/:blocked_id",
            params: ["token", "blocked_id"],
            res: UserIntercept.blocked.add
        },
        Remove: {
            name: "removeblocked",
            method: "GET",
            socketing: false,
            description: "Remove a blocked",
            path: "/remove/:blocked_id",
            params: ["token", "blocked_id"],
            res: UserIntercept.blocked.remove
        },
    }
}