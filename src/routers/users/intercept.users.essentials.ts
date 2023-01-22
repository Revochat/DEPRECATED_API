import { passwordUpdate, pfpUpdate, usernameUpdate, walletUpdate } from "./update"
import { userLogin, userRegister, userConnect } from "./connect"
import { getUserbyToken, getUserbyID, getUsername, getUserFriendsRequestsSent, getUserFriendsRequestsReceived, getUserBlocked, getServers, getChannels, getUserCreatedAt, getUserFriends, getUserLastConnection, 
         getUserMessagePrivacy, getUserPremiumExpiration, getUserProfilePicture, getUserStatus, getUserUpdatedAt, getUserWalletToken} from "./get"


export const UserInterceptEssentials = {
    register : userRegister,

    login : userLogin,

    connect : userConnect,

    get: {
        user: getUserbyToken,
        id: getUserbyID,
        wallet_token: getUserWalletToken,
        username: getUsername,
        premium_expiration: getUserPremiumExpiration,
        profile_picture: getUserProfilePicture,
        message_privacy: getUserMessagePrivacy,
        status: getUserStatus,
        updated_at: getUserUpdatedAt,
        created_at: getUserCreatedAt,
        last_connection: getUserLastConnection,
        servers: getServers,
        channels: getChannels,
        friends: getUserFriends,
        friends_requests_sent: getUserFriendsRequestsSent,
        friends_requests_received: getUserFriendsRequestsReceived,
        blocked: getUserBlocked
    },

    update : { 
        username : usernameUpdate,
        password : passwordUpdate,
        profile_picture : pfpUpdate,
        wallet_token: walletUpdate,
    }
}