

import { ChannelsInterceptEssentials } from "./intercept.channels.essentials";
import { ChannelsInterceptModeration } from "./intercept.channels.moderation";

export const ChannelsRouter = {
    path: "/channel",

    // Essentials

    Create: {
        path: "/create",
        Private: {
            name: "createPrivate",
            method: "GET",
            socketing: false,
            description: "Create a private channel",
            path: "/private/:friend_id",
            params: ["token", "friend_id"],
            res: ChannelsInterceptEssentials.create.private
        },
        Group: {
            name: "createGroup",
            method: "GET",
            socketing: false,
            description: "Create a group channel",
            path: "/group/:friend_id_1/:friend_id_2",
            params: ["token", "friend_id_1", "friend_id_2"],
            res: ChannelsInterceptEssentials.create.group
        },
        Server: {
            name: "createServer",
            method: "GET",
            socketing: false,
            description: "Create a server channel",
            path: "/server/:server_id",
            params: ["token", "server_id", "channel_name", "channel_type"],
            res: ChannelsInterceptEssentials.create.server
        }
    },

    Delete : {
        name: "delete",
        method: "GET",
        socketing: false,
        description: "Delete a channel",
        path: "/remove/:channel_id",
        params: ["token", "channel_id"],
        res: ChannelsInterceptEssentials.management.remove
    },

    // Update : {
    //     name: "update",
    //     method: "GET",
    //     socketing: false,
    //     description: "Update a channel",
    //     path: "/update/:channel_id",
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
            path: "/:channel_id",
            params: ["token", "channel_id"],
            res: ChannelsInterceptEssentials.get.channel
        },
        
        Owner_id : {
            name: "getOwner_id",
            method: "GET",
            socketing: false,
            description: "Get owner_id from a channel",
            path: "/owner_id/:channel_id",
            params: ["token", "channel_id"],
            res: ChannelsInterceptEssentials.get.owner_id
        },
        Channel_name : {
            name: "getChannel_name",
            method: "GET",
            socketing: false,
            description: "Get channel_name from a channel",
            path: "/channel_name/:channel_id",
            params: ["token", "channel_id"],
            res: ChannelsInterceptEssentials.get.channel_name
        },
        Channel_type : {
            name: "getChannel_type",
            method: "GET",
            socketing: false,
            description: "Get channel_type from a channel",
            path: "/channel_type/:channel_id",
            params: ["token", "channel_id"],
            res: ChannelsInterceptEssentials.get.channel_type
        },
        Members : {
            name: "getMembers",
            method: "GET",
            socketing: false,
            description: "Get members from a channel",
            path: "/members/:channel_id",
            params: ["token", "channel_id"],
            res: ChannelsInterceptEssentials.get.members
        },
        Members_count : {
            name: "getMembers_count",
            method: "GET",
            socketing: false,
            description: "Get members_count from a channel",
            path: "/members_count/:channel_id",
            params: ["token", "channel_id"],
            res: ChannelsInterceptEssentials.get.members_count
        },
        Updated_at : {
            name: "getUpdated_at",
            method: "GET",
            socketing: false,
            description: "Get updated_at from a channel",
            path: "/updated_at/:channel_id",
            params: ["token", "channel_id"],
            res: ChannelsInterceptEssentials.get.updated_at
        },
        Created_at : {
            name: "getCreated_at",
            method: "GET",
            socketing: false,
            description: "Get created_at from a channel",
            path: "/created_at/:channel_id",
            params: ["token", "channel_id"],
            res: ChannelsInterceptEssentials.get.created_at
        },
        Permissions : {
            name: "getPermissions",
            method: "GET",
            socketing: false,
            description: "Get permissions from a channel",
            path: "/permissions/:channel_id",
            params: ["token", "channel_id"],
            res: ChannelsInterceptEssentials.get.permissions
        },

        Messages : {
            name: "getMessages",
            method: "GET",
            socketing: false,
            description: "Get messages from a channel",
            path: "/messages/:channel_id/:limit",
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
        path: "/messages/send/:channel_id",
        params: ["token", "channel_id", "message"],
        res: ChannelsInterceptEssentials.messages.send
    },

    DeleteMessage : {
        name: "deletemessage",
        method: "GET",
        socketing: false,
        description: "Delete a message from a channel",
        path: "/messages/delete/:channel_id/:message_id",
        params: ["token", "channel_id", "message_id"],
        res: ChannelsInterceptEssentials.messages.delete
    },

    // Moderation

    // Kick : {
    //     name: "kick",
    //     method: "POST",
    //     socketing: false,
    //     description: "Kick a user from a channel",
    //     path: "/kick/:channel_id/:user_id",
    //     params: ["token", "channel_id", "user_id", "member_id"],
    //     res: ChannelsInterceptModeration.kick
    // },

}