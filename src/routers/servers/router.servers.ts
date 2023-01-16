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
            path: "/channels/:token/:server_id",
            params: ["token", "server_id"],
            res: ServerIntercept.get.channels
        },

        members : {
            name: "getMembers",
            method: "GET",
            socketing: true,
            description: "Get members of a server",
            path: "/members/:token/:server_id",
            params: ["token", "server_id"],
            res: ServerIntercept.get.members
        },

        server : {
            name: "getServer",
            method: "GET",
            socketing: true,
            description: "Get a server",
            path: "/:token/:server_id",
            params: ["token", "server_id"],
            res: ServerIntercept.get.server
        }
    },

    manage : {
        create : {
            name: "create",
            method: "GET",
            socketing: true,
            description: "Create a server",
            path: "/create/:token/:server_name",
            params: ["token", "server_name"],
            res: ServerIntercept.manage.create
        },
        remove : {
            name: "remove",
            method: "GET",
            socketing: true,
            description: "Remove a server",
            path: "/remove/:token/:server_id",
            params: ["token", "server_id"],
            res: ServerIntercept.manage.remove
        }
    },

    // Update : {
    //     name: "update",
    //     method: "GET",
    //     socketing: true,
    //     description: "Update a server",
    //     path: "/update/:token/:server_id",
    //     res: ServerIntercept.update
    // },

    // user add, remove, update roles, ..
}