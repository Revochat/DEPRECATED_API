import { hasServerPermissions } from './server.hasPermissions';
import { hasChannelPermissions } from './channel.hasPermissions';
import { checkIntegrity } from './integrity.permissions.check';

export class PERMISSIONS {
    hasServerPermissions = hasServerPermissions;
    hasChannelPermissions = hasChannelPermissions;
    checkIntegrity= checkIntegrity;
    checkRoleColor = (color: string) => {
        if (!color) return false;
        if (color.length !== 7) return false;
        if (color[0] !== "#") return false;
        if (!/^[0-9A-F]{6}$/i.test(color.slice(1))) return false;
        return true;
    }
}