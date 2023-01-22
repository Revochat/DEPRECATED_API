import {getServer} from "./servers.get"
import {getChannels} from "./servers.channels.get"
import {getMembers} from "./servers.members.get"
import {getPermissions} from "./servers.permissions.get"
import {getCreatedAt} from "./servers.created_at.get"
import {getUpdatedAt} from "./servers.updated_at.get"
import {getMembersCount} from "./servers.members_count.get"
import {getServerName} from "./servers.name.get"
import {getOwner} from "./servers.owner.get"
import {getServerIcon} from "./servers.icon.get"

export const get = {
    server: getServer,
    channels: getChannels,
    members: getMembers,
    permissions: getPermissions,
    created_at: getCreatedAt,
    updated_at: getUpdatedAt,
    members_count: getMembersCount,
    server_name: getServerName,
    owner_id: getOwner,
    server_icon: getServerIcon
}
