import {ServerIntercept} from "./intercept.server"

export const ServersRouter = {
    path: "/server",

    get : {
        path: "/get",
        channels : {
            name: "getChannels",
            method: "GET",
            socketing: true,
            description: "Get channels of a server",
            path: "/Channels/:token/:server_id",
            res: ServerIntercept.get.channels
        },

        members : {
            name: "getMembers",
            method: "GET",
            socketing: true,
            description: "Get members of a server",
            path: "/Members/:token/:server_id",
            res: ServerIntercept.get.members
        },

        server : {
            name: "getServer",
            method: "GET",
            socketing: true,
            description: "Get a server",
            path: "/:token/:server_id",
            res: ServerIntercept.get.server
        }
    }
}