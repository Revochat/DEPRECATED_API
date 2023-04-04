import {hasChannelPermissions} from './channel.hasPermissions';
import {hasServerPermissions} from './server.hasPermissions';
import {checkIntegrity} from './integrity.permissions.check';
import {checkRoleColor} from './role.color.check';

export const PERMISSIONS = {
    hasChannelPermissions,
    hasServerPermissions,
    checkIntegrity,
    checkRoleColor
}