import { hasServerPermissions } from './server.hasPermissions';
import { hasChannelPermissions } from './channel.hasPermissions';
import { checkIntegrity } from './integrity.permissions.check';

export class PERMISSIONS {
    hasServerPermissions = hasServerPermissions;
    hasChannelPermissions = hasChannelPermissions;
    checkIntegrity= checkIntegrity;
}