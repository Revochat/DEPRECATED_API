import {getUserbyToken} from "./users.token.get"
import {getUserbyID} from "./users.id.get"
import {getUsername} from "./users.username.get"
import {getWalletToken} from "./users.wallet_token.get"
import {getUpdatedAt} from "./users.updated_at.get"
import {getCreatedAt} from "./users.created_at.get"
import {getAvatar} from "./users.avatar.get"
import {getPremiumExpiration} from "./users.premium_expiration.get"
import {getStatus} from "./users.status.get"
import {getMessagePrivacy} from "./users.message_privacy.get"
import {getServers} from "./users.servers.get"
import {getFriends} from "./users.friends.get"
import {getFriendsRequestsReceived} from "./users.friends_requests_received.get"
import {getFriendsRequestsSent} from "./users.friends_requests_sent.get"
import {getBlocked} from "./users.blocked.get"
import {getChannels} from "./users.channels.get"
import {getLastConnection} from "./users.last_connection.get"

export const get = {
    UserbyToken: getUserbyToken,
    UserbyID: getUserbyID,
    Username: getUsername,
    WalletToken: getWalletToken,
    UpdatedAt: getUpdatedAt,
    CreatedAt: getCreatedAt,
    Avatar: getAvatar,
    PremiumExpiration: getPremiumExpiration,
    Status: getStatus,
    MessagePrivacy: getMessagePrivacy,
    Servers: getServers,
    Friends: getFriends,
    FriendsRequestsReceived: getFriendsRequestsReceived,
    FriendsRequestsSent: getFriendsRequestsSent,
    Blocked: getBlocked,
    Channels: getChannels,
    LastConnection: getLastConnection,
}