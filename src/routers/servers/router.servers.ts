import {ServerIntercept} from "./intercept.server"

export const ServersRouter = {
    path: "/server",

    getChannels : {
        method: "GET",
        path: "/getChannels/:token/:server",
        res: ServerIntercept.getChannels
    },
    getMembers : {
        method: "GET",
        path: "/getMembers/:token/:server",
        res: ServerIntercept.getMembers
    },
    getServer : {
        method: "GET",
        path: "/getServer/:token/:server",
        res: ServerIntercept.getServer
    }
}