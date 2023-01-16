import { getServer, getMembers, getChannels} from "./get"
import { create } from "./create"

export const ServerIntercept = {
    create: create,
    get: {
        server: getServer,
        members: getMembers,
        channels: getChannels
    }
}