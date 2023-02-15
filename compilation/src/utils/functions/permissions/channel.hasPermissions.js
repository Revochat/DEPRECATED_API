"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasChannelPermission = void 0;
const hasChannelPermission = (user, channel, permission) => {
    // Check if the user has the permission
    if (user.user_id === channel.owner_id)
        return true; // If the user is the owner of the channel, return true
    if (channel.permissions) {
        if (channel.permissions.admin.user_id.includes(user.user_id))
            return true; // If the user has an admin perm, return true
        if (channel.permissions.admin.roles_id.includes(user.user_id))
            return true; // If the user has an admin perm, return true
        const channelPermissions = channel.permissions; // Get the channel permissions
        if (permission.length === 0) {
            if (channelPermissions[permission[0]].roles_id.includes(user.user_id))
                return true; // If the user has the permission, return true
            if (channelPermissions[permission[0]].user_id.includes(user.user_id))
                return true; // If the user has the permission, return true
        }
        else if (permission.length === 1) {
            if (channelPermissions[permission[0]][permission[1]].user_id.includes(user.user_id))
                return true; // If the user has the permission, return true
            if (channelPermissions[permission[0]][permission[1]].roles_id.includes(user.user_id))
                return true; // If the user has the permission, return true
        }
    }
    return false;
};
exports.hasChannelPermission = hasChannelPermission;
