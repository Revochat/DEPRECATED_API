"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FUNCTIONS = void 0;
const find_1 = require("./find");
const permissions_1 = require("./permissions");
class FUNCTIONS {
}
exports.FUNCTIONS = FUNCTIONS;
FUNCTIONS.CHECK = {
    CHANNEL: {
        PERMISSIONS: permissions_1.PERMISSIONS.hasChannelPermissions,
        INTEGRITY: permissions_1.PERMISSIONS.checkIntegrity,
    },
    SERVER: {
        PERMISSIONS: permissions_1.PERMISSIONS.hasServerPermissions
    },
    ROLE: {
        COLOR: permissions_1.PERMISSIONS.checkRoleColor
    }
};
FUNCTIONS.FIND = {
    CHANNEL: {
        id: find_1.findChannelID,
        friend: find_1.findChannelFriend
    },
    USER: {
        blocked: find_1.findUserBlocked,
        token: find_1.findUserbyToken,
        id: find_1.findUserbyID,
        friend: find_1.findFriendbyUser
    },
    SERVER: {
        id: find_1.findServer,
        member: find_1.findUserInServer
    }
};
FUNCTIONS.REMOVE_OVERFLOW_INFO_SERVER = (server) => {
    server.owner = undefined;
    server.members = undefined;
    server.channels = undefined;
    server.invites = undefined;
    server.bans = undefined;
    server.roles = undefined;
    server.permissions = undefined;
    return server;
};
FUNCTIONS.REMOVE_PRIVATE_INFO_USER = (user) => {
    user.password = undefined;
    user.token = undefined;
    user.friends_requests_received = undefined;
    user.friends_requests_sent = undefined;
    user.blocked = undefined;
    user.servers = undefined;
    user.channels = undefined;
    user.friends = undefined;
    return user;
};
FUNCTIONS.REMOVE_OVERFLOW_INFO_CHANNEL = (channel) => {
    channel.members = undefined;
    channel.messages = undefined;
    channel.permissions = undefined;
    return channel;
};
