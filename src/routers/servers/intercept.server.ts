import { getServer, getMembers, getChannels} from "./get"

export const ServerIntercept = {
    get: {
        server: getServer,
        members: getMembers,
        channels: getChannels
    }
}