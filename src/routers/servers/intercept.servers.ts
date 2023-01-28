import {get} from "./get"
import { create, remove } from "./manage"
import { update } from "./update"

export const ServerIntercept = {
    manage: {
        create: create,
        remove: remove
    },
    get: {
        server: get.server,
        channels: get.channels,
        members: get.members,
        permissions: get.permissions,
        created_at: get.created_at,
        updated_at: get.updated_at,
        members_count: get.members_count,
        server_name: get.server_name,
        owner_id: get.owner_id,
        server_icon: get.server_icon
    },
    update: {
        name: update.name,
        icon: update.icon,
        permissions: update.permissions
    }
}