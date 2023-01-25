import { hasChannelPermission } from './channel.hasPermissions';
import { hasServerPermission } from './server.hasPermissions';
import { checkChannelPermissions } from './channel.check';

export class PERMISSIONS {
    static hasChannelPermission = hasChannelPermission;
    static hasServerPermission = hasServerPermission;
    static checkChannelPermissions = checkChannelPermissions;
}