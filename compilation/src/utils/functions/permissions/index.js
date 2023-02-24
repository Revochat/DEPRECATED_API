"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSIONS = void 0;
const server_hasPermissions_1 = require("./server.hasPermissions");
const channel_hasPermissions_1 = require("./channel.hasPermissions");
const integrity_permissions_check_1 = require("./integrity.permissions.check");
class PERMISSIONS {
    constructor() {
        this.hasServerPermissions = server_hasPermissions_1.hasServerPermissions;
        this.hasChannelPermissions = channel_hasPermissions_1.hasChannelPermissions;
        this.checkIntegrity = integrity_permissions_check_1.checkIntegrity;
        this.checkRoleColor = (color) => {
            if (!color)
                return false;
            if (color.length !== 7)
                return false;
            if (color[0] !== "#")
                return false;
            if (!/^[0-9A-F]{6}$/i.test(color.slice(1)))
                return false;
            return true;
        };
    }
}
exports.PERMISSIONS = PERMISSIONS;
