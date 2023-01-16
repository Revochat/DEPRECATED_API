import { getServer, getMembers, getChannels} from "./get"
import { create, remove } from "./manage"

export const ServerIntercept = {
    manage: {
        create: create,
        remove: remove
    },
    get: {
        server: getServer,
        members: getMembers,
        channels: getChannels
    }
}