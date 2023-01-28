import { remove, leave} from "./manage"
import { create } from "./create"
import { update } from "./update/"
import { get} from "./get/"
import { addMember } from "./user"

export const ChannelsInterceptEssentials = {

    update: {
        channel_name: update.channel_name,
        permissions: update.permissions
    },
    create: {
        private: create.private,
        group: create.group,
        server: create.server
    },
    get: {
        channel: get.channel,
        members: get.members,
        messages: get.messages,
        permissions: get.permissions,
        created_at: get.created_at,
        updated_at: get.updated_at,
        members_count: get.members_count,
        channel_type: get.channel_type,
        channel_name: get.channel_name,
        owner_id: get.owner_id
    },
    management: {
        remove: remove,
        leave: leave
    },
    addMember
}