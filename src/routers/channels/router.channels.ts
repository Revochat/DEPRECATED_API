
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
            socketing: true,
            description: "Create a private channel",
            path: "/private/:token/:server_id/:channel_name",
            res: ChannelsInterceptEssentials.create.private
        },
        Group: {
            name: "createGroup",
            method: "GET",
            socketing: true,
            description: "Create a group channel",
            path: "/group/:token/:server_id/:channel_name",
            res: ChannelsInterceptEssentials.create.group
        },
        Server: {
            name: "createServer",
            method: "GET",
            socketing: true,
            description: "Create a server channel",
            path: "/server/:token/:server_id/:channel_name",
            res: ChannelsInterceptEssentials.create.server
        }
    },

    Delete : {
        name: "delete",
        method: "GET",
        socketing: true,
        description: "Delete a channel",
        path: "/remove/:token/:channel_id",
        res: ChannelsInterceptEssentials.management.remove
    },

    Update : {
        name: "update",
        method: "GET",
        socketing: true,
        description: "Update a channel",
        path: "/update/:token/:channel_id",
        res: ChannelsInterceptEssentials.update
    },

    get : {
        path: "/get",
        channel : {
            name: "getChannel",
            method: "GET",
            socketing: true,
            description: "Get a channel",
            path: "/:token/:channel_id",
            res: ChannelsInterceptEssentials.get.channel
        },
        Members : {
            name: "getMembers",
            method: "GET",
            socketing: true,
            description: "Get members from a channel",
            path: "/members/:token/:channel_id",
            res: ChannelsInterceptEssentials.get.members
        },
        Messages : {
            name: "getMessages",
            method: "GET",
            socketing: true,
            description: "Get messages from a channel",
            path: "/messages/:token/:channel_id/:limit",
            res: ChannelsInterceptEssentials.get.messages
        }
    },


    // Messages

    SendMessage : {
        name: "sendmessage",
        method: "GET",
        socketing: true,
        description: "Send a message to a channel",
        path: "/messages/send/:token/:channel_id/:message",
        res: ChannelsInterceptEssentials.messages.send
    },

    DeleteMessage : {
        name: "deletemessage",
        method: "GET",
        socketing: true,
        description: "Delete a message from a channel",
        path: "/messages/delete/:token/:channel_id/:message_id",
        res: ChannelsInterceptEssentials.messages.delete
    },

    // Moderation

    Kick : {
        name: "kick",
        method: "GET",
        socketing: true,
        description: "Kick a user from a channel",
        path: "/kick/:token/:channel_id/:user_id",
        res: ChannelsInterceptModeration.kick
    },

}