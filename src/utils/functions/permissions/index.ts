import { hasChannelPermission } from './channel.hasPermissions';
import { hasServerPermission } from './server.hasPermissions';
import { checkChannelPermissions } from './channel.check';
import { checkIntegrity } from './integrity.permissions.check';

export class PERMISSIONS {
    static hasChannelPermission = hasChannelPermission;
    static hasServerPermission = hasServerPermission;
    static checkChannelPermissions = checkChannelPermissions;
    static checkIntegrity = checkIntegrity;
}