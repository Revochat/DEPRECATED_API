"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const users_token_get_1 = require("./users.token.get");
const users_id_get_1 = require("./users.id.get");
const users_username_get_1 = require("./users.username.get");
const users_wallet_token_get_1 = require("./users.wallet_token.get");
const users_updated_at_get_1 = require("./users.updated_at.get");
const users_created_at_get_1 = require("./users.created_at.get");
const users_avatar_get_1 = require("./users.avatar.get");
const users_premium_expiration_get_1 = require("./users.premium_expiration.get");
const users_status_get_1 = require("./users.status.get");
const users_message_privacy_get_1 = require("./users.message_privacy.get");
const users_servers_get_1 = require("./users.servers.get");
const users_friends_get_1 = require("./users.friends.get");
const users_friends_requests_received_get_1 = require("./users.friends_requests_received.get");
const users_friends_requests_sent_get_1 = require("./users.friends_requests_sent.get");
const users_blocked_get_1 = require("./users.blocked.get");
const users_channels_get_1 = require("./users.channels.get");
const users_last_connection_get_1 = require("./users.last_connection.get");
exports.get = {
    UserbyToken: users_token_get_1.getUserbyToken,
    UserbyID: users_id_get_1.getUserbyID,
    Username: users_username_get_1.getUsername,
    WalletToken: users_wallet_token_get_1.getWalletToken,
    UpdatedAt: users_updated_at_get_1.getUpdatedAt,
    CreatedAt: users_created_at_get_1.getCreatedAt,
    Avatar: users_avatar_get_1.getAvatar,
    PremiumExpiration: users_premium_expiration_get_1.getPremiumExpiration,
    Status: users_status_get_1.getStatus,
    MessagePrivacy: users_message_privacy_get_1.getMessagePrivacy,
    Servers: users_servers_get_1.getServers,
    Friends: users_friends_get_1.getFriends,
    FriendsRequestsReceived: users_friends_requests_received_get_1.getFriendsRequestsReceived,
    FriendsRequestsSent: users_friends_requests_sent_get_1.getFriendsRequestsSent,
    Blocked: users_blocked_get_1.getBlocked,
    Channels: users_channels_get_1.getChannels,
    LastConnection: users_last_connection_get_1.getLastConnection,
};
