import {ServerIntercept} from "./intercept.server"

export const ServersRouter = {
    path: "/server",

    getChannels : {
        name: "getChannels",
        method: "GET",
        socketing: true,
        description: "Get channels of a server",
        path: "/get/Channels/:token/:server_id",
        res: ServerIntercept.getChannels
    },

    getMembers : {
        name: "getMembers",
        method: "GET",
        socketing: true,
        description: "Get members of a server",
        path: "/get/Members/:token/:server_id",
        res: ServerIntercept.getMembers
    },

    getServer : {
        name: "getServer",
        method: "GET",
        socketing: true,
        description: "Get a server",
        path: "/get/:token/:server_id",
        res: ServerIntercept.getServer
    }
}