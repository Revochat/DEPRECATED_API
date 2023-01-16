import { remove, leave} from "./manage"
import { create_private, create_group, create_server } from "./create"
import { update } from "./update/"
import { getChannel, getMembers, getMessages } from "./get/"
import { sendMessage, deleteMessage } from "./messages"
import { add } from "./user"

export const ChannelsInterceptEssentials = {

    update: update,
    create: {
        private: create_private,
        group: create_group,
        server: create_server
    },
    get: {
        channel: getChannel,
        members: getMembers,
        messages: getMessages
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