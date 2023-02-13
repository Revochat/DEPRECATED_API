import { update } from "./update"
import { userLogin, userRegister, userConnect } from "./connect"
import { get } from "./get"
import { friends } from "./friends"
import { blocked } from "./blocked"


export const UserIntercept = {
    register : userRegister,
    login : userLogin,
    connect : userConnect,

    get: {
        user: get.UserbyToken,
        username: get.Username,
        wallet_token: get.WalletToken,
        updated_at: get.UpdatedAt,
        created_at: get.CreatedAt,
        avatar: get.Avatar,
        premium_expiration: get.PremiumExpiration,
        status: get.Status,
        message_privacy: get.MessagePrivacy,
        servers: get.Servers,
        friends: get.Friends,
        friends_requests_received: get.FriendsRequestsReceived,
        friends_requests_sent: get.FriendsRequestsSent,
        blocked: get.Blocked,
        channels: get.Channels,
        last_connection: get.LastConnection,
    },

    update : { 
        username: update.username,
        password: update.password,
        avatar: update.avatar,
        wallet_token: update.wallet_token,
        status: update.status,
        channels: update.channels,
        servers: update.servers
    },

    friends: {
        add: friends.add,
        remove: friends.remove
    },

    blocked: {
        add: blocked.add,
        remove: blocked.remove
    }
}