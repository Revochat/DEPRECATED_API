import { hasChannelPermission } from './channel.hasPermissions';
import { hasServerPermission } from './server.hasPermissions';

export class PERMISSIONS {
    static hasChannelPermission = hasChannelPermission;
    static hasServerPermission = hasServerPermission;
}