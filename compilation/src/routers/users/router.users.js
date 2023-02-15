"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const intercept_users_1 = require("./intercept.users");
exports.UserRouter = {
    path: "/client",
    Register: {
        name: "register",
        description: "Register a new user",
        method: "POST",
        socketing: false,
        path: "/register",
        params: ["username", "password"],
        res: intercept_users_1.UserIntercept.register
    },
    Login: {
        name: "login",
        description: "Login a user with login credentials",
        method: "POST",
        socketing: false,
        path: "/login",
        params: ["username", "password"],
        res: intercept_users_1.UserIntercept.login,
    },
    Connect: {
        name: "conn",
        description: "Connect a user with a user token",
        method: "GET",
        socketing: true,
        path: "/connect",
        params: ["token"],
        res: intercept_users_1.UserIntercept.connect,
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
            res: intercept_users_1.UserIntercept.update.status
        },
        Username: {
            name: "updateusername",
            method: "GET",
            socketing: false,
            description: "Update a user's username",
            path: "/username/:newusername",
            params: ["token", "newusername"],
            res: intercept_users_1.UserIntercept.update.username
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
            res: intercept_users_1.UserIntercept.update.password
        },
        Wallet_token: {
            name: "updatewallettoken",
            method: "POST",
            socketing: false,
            description: "Update a user's wallet token",
            path: "/wallet_token/",
            params: ["token", "newwallet_token"],
            res: intercept_users_1.UserIntercept.update.wallet_token
        },
        Channels: {
            name: "updatechannels",
            method: "POST",
            socketing: false,
            description: "Update a user's channels order",
            path: "/channels/",
            params: ["token", "newchannels"],
            res: intercept_users_1.UserIntercept.update.channels
        },
        Servers: {
            name: "updateservers",
            method: "POST",
            socketing: false,
            description: "Update a user's servers order",
            path: "/servers/",
            params: ["token", "newservers"],
            res: intercept_users_1.UserIntercept.update.servers
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
            res: intercept_users_1.UserIntercept.get.user
        },
        // Wallet_token: {
        //     name: "getwallettoken",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user wallet token",
        //     path: "/wallet_token/:wallet_token",
        //     params: ["wallet_token"],
        //     res: UserIntercept.get.wallet_token
        // },
        Username: {
            name: "getusername",
            method: "GET",
            socketing: false,
            description: "Get a user username",
            path: "/username/:user_id",
            params: ["user_id"],
            res: intercept_users_1.UserIntercept.get.username
        },
        Premium_expiration: {
            name: "getpremiumexpiration",
            method: "GET",
            socketing: false,
            description: "Get a user premium expiration",
            path: "/premium_expiration/:user_id",
            params: ["user_id"],
            res: intercept_users_1.UserIntercept.get.premium_expiration
        },
        // Avatar: {
        //     name: "getavatar",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a user avatar",
        //     path: "/avatar/:user_id",
        //     params: ["user_id"],
        //     res: UserIntercept.get.avatar
        // },
        Message_privacy: {
            name: "getmessageprivacy",
            method: "GET",
            socketing: false,
            description: "Get a user message privacy",
            path: "/messageprivacy/:user_id",
            params: ["user_id"],
            res: intercept_users_1.UserIntercept.get.message_privacy
        },
        Status: {
            name: "getstatus",
            method: "GET",
            socketing: false,
            description: "Get a user status",
            path: "/status/:user_id",
            params: ["user_id"],
            res: intercept_users_1.UserIntercept.get.status
        },
        Updated_at: {
            name: "getupdatedat",
            method: "GET",
            socketing: false,
            description: "Get a user updated at",
            path: "/updated_at/:user_id",
            params: ["user_id"],
            res: intercept_users_1.UserIntercept.get.updated_at
        },
        Created_at: {
            name: "getcreatedat",
            method: "GET",
            socketing: false,
            description: "Get a user created at",
            path: "/created_at/:user_id",
            params: ["user_id"],
            res: intercept_users_1.UserIntercept.get.created_at
        },
        Last_connection: {
            name: "getlastconnection",
            method: "GET",
            socketing: false,
            description: "Get a user last connection",
            path: "/last_connection/:user_id",
            params: ["user_id"],
            res: intercept_users_1.UserIntercept.get.last_connection
        },
        Servers: {
            name: "getservers",
            method: "GET",
            socketing: false,
            description: "Get a user servers",
            path: "/servers/",
            params: ["token"],
            res: intercept_users_1.UserIntercept.get.servers
        },
        Channels: {
            name: "getchannels",
            method: "GET",
            socketing: false,
            description: "Get a user channels",
            path: "/channels/",
            params: ["token"],
            res: intercept_users_1.UserIntercept.get.channels
        },
        Friends: {
            name: "getfriends",
            method: "GET",
            socketing: false,
            description: "Get a user friends",
            path: "/friends/",
            params: ["token"],
            res: intercept_users_1.UserIntercept.get.friends
        },
        Friends_requests_received: {
            name: "getfriendsrequestsreceived",
            method: "GET",
            socketing: false,
            description: "Get a user friends_requests_received",
            path: "/friends_requests_received/",
            params: ["token"],
            res: intercept_users_1.UserIntercept.get.friends_requests_received
        },
        Friends_requests_sent: {
            name: "getfriendsrequestssent",
            method: "GET",
            socketing: false,
            description: "Get a user friends_requests_sent",
            path: "/friends_requests_sent/",
            params: ["token"],
            res: intercept_users_1.UserIntercept.get.friends_requests_sent
        },
        Blocked: {
            name: "getblocked",
            method: "GET",
            socketing: false,
            description: "Get blocked users of a user",
            path: "/blocked/",
            params: ["token"],
            res: intercept_users_1.UserIntercept.get.blocked
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
            res: intercept_users_1.UserIntercept.friends.add
        },
        Remove: {
            name: "removefriend",
            method: "GET",
            socketing: false,
            description: "Remove a friend",
            path: "/remove/:friend_id",
            params: ["token", "friend_id"],
            res: intercept_users_1.UserIntercept.friends.remove
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
            res: intercept_users_1.UserIntercept.blocked.add
        },
        Remove: {
            name: "removeblocked",
            method: "GET",
            socketing: false,
            description: "Remove a blocked",
            path: "/remove/:blocked_id",
            params: ["token", "blocked_id"],
            res: intercept_users_1.UserIntercept.blocked.remove
        },
    }
};
