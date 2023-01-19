import {ServerIntercept} from "./intercept.servers"
import { update } from '../channels/update/channels.update';

export const ServersRouter = {
    path: "/server",

    get : {
        path: "/get",

        Server : {
            name: "getServer",
            method: "GET",
            socketing: true,
            description: "Get a server",
            path: "/:server_id",
            params: ["token", "server_id"],
            res: ServerIntercept.get.server
        },

        // Server_id: {
        //     name: "getServerId",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a server id",
        //     path: "/server_id/:token/:server_name",
        //     params: ["token", "server_name"],
        //     res: ServerIntercept.get.server_id
        // },
        // Server_name: {
        //     name: "getServerName",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a server name",
        //     path: "/server_name/:token/:server_id",
        //     params: ["token", "server_id"],
        //     res: ServerIntercept.get.server_name
        // },
        // Owner_id: {
        //     name: "getOwnerId",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get a server owner id",
        //     path: "/owner_id/:token/:server_id",
        //     params: ["token", "server_id"],
        //     res: ServerIntercept.get.owner_id
        // },
        Channels : {
            name: "getChannels",
            method: "GET",
            socketing: true,
            description: "Get channels of a server",
            path: "/channels/:server_id",
            params: ["token", "server_id"],
            res: ServerIntercept.get.channels
        },
        Members : {
            name: "getMembers",
            method: "GET",
            socketing: true,
            description: "Get members of a server",
            path: "/members/:server_id",
            params: ["token", "server_id"],
            res: ServerIntercept.get.members
        },
        // Members_count: {
        //     name: "getMembersCount",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get members count of a server",
        //     path: "/members_count/:token/:server_id",
        //     params: ["token", "server_id"],
        //     res: ServerIntercept.get.members_count
        // },
        // Updated_at: {
        //     name: "getUpdatedAt",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get updated_at of a server",
        //     path: "/updated_at/:token/:server_id",
        //     params: ["token", "server_id"],
        //     res: ServerIntercept.get.updated_at
        // },
        // Created_at: {
        //     name: "getCreatedAt",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get created_at of a server",
        //     path: "/created_at/:token/:server_id",
        //     params: ["token", "server_id"],
        //     res: ServerIntercept.get.created_at
        // },
        // Permissions_id: {
        //     name: "getPermissionsId",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get permissions_id of a server",
        //     path: "/permissions_id/:token/:server_id",
        //     params: ["token", "server_id"],
        //     res: ServerIntercept.get.permissions_id
        // }
    },

    manage : {
        create : {
            name: "create",
            method: "GET",
            socketing: true,
            description: "Create a server",
            path: "/create/:server_name",
            params: ["token", "server_name"],
            res: ServerIntercept.manage.create
        },
        remove : {
            name: "remove",
            method: "GET",
            socketing: true,
            description: "Remove a server",
            path: "/remove/:server_id",
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