"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSIONS = void 0;
const channel_hasPermissions_1 = require("./channel.hasPermissions");
const server_hasPermissions_1 = require("./server.hasPermissions");
const channel_check_1 = require("./channel.check");
const integrity_permissions_check_1 = require("./integrity.permissions.check");
class PERMISSIONS {
}
exports.PERMISSIONS = PERMISSIONS;
PERMISSIONS.hasChannelPermission = channel_hasPermissions_1.hasChannelPermission;
PERMISSIONS.hasServerPermission = server_hasPermissions_1.hasServerPermission;
PERMISSIONS.checkChannelPermissions = channel_check_1.checkChannelPermissions;
PERMISSIONS.checkIntegrity = integrity_permissions_check_1.checkIntegrity;
