

import { ChannelsInterceptEssentials } from "./intercept.channels.essentials";
import { ChannelsInterceptModeration } from "./intercept.channels.moderation";

export const ChannelsRouter = {
    path: "/channel",

    // Essentials

    Create: {
        path: "/create",
        Private: {
            name: "createPrivate",
            method: "POST",
            socketing: false,
            description: "Create a private channel",
            path: "/private/:token/:friend_id",
            params: ["token", "friend_id"],
            res: ChannelsInterceptEssentials.create.private
        },
        Group: {
            name: "createGroup",
            method: "POST",
            socketing: false,
            description: "Create a group channel",
            path: "/group/:token/:friend_id_1/:friend_id_2",
            params: ["token", "friend_id_1", "friend_id_2"],
            res: ChannelsInterceptEssentials.create.group
        },
        Server: {
            name: "createServer",
            method: "POST",
            socketing: false,
            description: "Create a server channel",
            path: "/server/:token/:server_id",
            params: ["token", "server_id", "channel_name", "channel_type"],
            res: ChannelsInterceptEssentials.create.server
        }
    },

    Delete : {
        name: "delete",
        method: "POST",
        socketing: false,
        description: "Delete a channel",
        path: "/remove/:token/:channel_id",
        params: ["token", "channel_id"],
        res: ChannelsInterceptEssentials.management.remove
    },

    // Update : {
    //     name: "update",
    //     method: "GET",
    //     socketing: false,
    //     description: "Update a channel",
    //     path: "/update/:token/:channel_id",
    //     params: ["token", "channel_id", "channel_name"],
    //     res: ChannelsInterceptEssentials.update
    // },

    get : {
        path: "/get",
        Channel : {
            name: "getChannel",
            method: "GET",
            socketing: false,
            description: "Get a channel",
            path: "/:token/:channel_id",
            params: ["token", "channel_id"],
            res: ChannelsInterceptEssentials.get.channel
        },

        // Server_id : {
        //     name: "getServer_id",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get server_id from a channel",
        //     path: "/server_id/:token/:channel_id",
        //     params: ["token", "channel_id"],
        //     res: ChannelsInterceptEssentials.get.server_id
        // },
        // Owner_id : {
        //     name: "getOwner_id",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get owner_id from a channel",
        //     path: "/owner_id/:token/:channel_id",
        //     params: ["token", "channel_id"],
        //     res: ChannelsInterceptEssentials.get.owner_id
        // },
        // Channel_name : {
        //     name: "getChannel_name",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get channel_name from a channel",
        //     path: "/channel_name/:token/:channel_id",
        //     params: ["token", "channel_id"],
        //     res: ChannelsInterceptEssentials.get.channel_name
        // },
        // Channel_type : {
        //     name: "getChannel_type",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get channel_type from a channel",
        //     path: "/channel_type/:token/:channel_id",
        //     params: ["token", "channel_id"],
        //     res: ChannelsInterceptEssentials.get.channel_type
        // },
        Members : {
            name: "getMembers",
            method: "GET",
            socketing: false,
            description: "Get members from a channel",
            path: "/members/:token/:channel_id",
            params: ["token", "channel_id"],
            res: ChannelsInterceptEssentials.get.members
        },
        // Members_count : {
        //     name: "getMembers_count",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get members_count from a channel",
        //     path: "/members_count/:token/:channel_id",
        //     params: ["token", "channel_id"],
        //     res: ChannelsInterceptEssentials.get.members_count
        // },
        // Updated_at : {
        //     name: "getUpdated_at",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get updated_at from a channel",
        //     path: "/updated_at/:token/:channel_id",
        //     params: ["token", "channel_id"],
        //     res: ChannelsInterceptEssentials.get.updated_at
        // },
        // Created_at : {
        //     name: "getCreated_at",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get created_at from a channel",
        //     path: "/created_at/:token/:channel_id",
        //     params: ["token", "channel_id"],
        //     res: ChannelsInterceptEssentials.get.created_at
        // },
        // Permissions : {
        //     name: "getPermissions",
        //     method: "GET",
        //     socketing: false,
        //     description: "Get permissions from a channel",
        //     path: "/permissions/:token/:channel_id",
        //     params: ["token", "channel_id"],
        //     res: ChannelsInterceptEssentials.get.permissions
        // },

        Messages : {
            name: "getMessages",
            method: "GET",
            socketing: false,
            description: "Get messages from a channel",
            path: "/messages/:token/:channel_id/:limit",
            params: ["token", "channel_id", "limit"],
            res: ChannelsInterceptEssentials.get.messages
        },

    },


    // Messages

    SendMessage : {
        name: "sendmessage",
        method: "POST",
        socketing: false,
        description: "Send a message to a channel",
        path: "/messages/send/:token/:channel_id",
        params: ["token", "channel_id", "message"],
        res: ChannelsInterceptEssentials.messages.send
    },

    DeleteMessage : {
        name: "deletemessage",
        method: "POST",
        socketing: false,
        description: "Delete a message from a channel",
        path: "/messages/delete/:token/:channel_id/:message_id",
        params: ["token", "channel_id", "message_id"],
        res: ChannelsInterceptEssentials.messages.delete
    },

    // Moderation

    // Kick : {
    //     name: "kick",
    //     method: "POST",
    //     socketing: false,
    //     description: "Kick a user from a channel",
    //     path: "/kick/:token/:channel_id/:user_id",
    //     params: ["token", "channel_id", "user_id", "member_id"],
    //     res: ChannelsInterceptModeration.kick
    // },

}