import { remove, leave} from "./manage"
import { create } from "./create"
import { update } from "./update/"
import { get} from "./get/"
import { sendMessage, deleteMessage } from "./messages"
import { add } from "./user"

export const ChannelsInterceptEssentials = {

    update: update,
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
    messages: {
        send: sendMessage,
        delete: deleteMessage
    },
    management: {
        remove: remove,
        leave: leave
    },
    user: {
        add: add
    }
}