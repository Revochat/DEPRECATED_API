
import { ChannelsInterceptEssentials } from "./intercept.channels.essentials";
import { ChannelsInterceptModeration } from "./intercept.channels.moderation";
import { ChannelsInterceptGroups } from "./intercept.channels.groups";

export const ChannelsRouter = {
    path: "/channel",

    // Essentials

    Create : {
        name: "create",
        method: "GET",
        socketing: true,
        description: "Create a channel",
        path: "/create/:token/:channel_name",
        res: ChannelsInterceptEssentials.management.create
    },

    GetChannel : {
        name: "getchannel",
        method: "GET",
        socketing: true,
        description: "Get a channel",
        path: "/get/:token/:channel_id",
        res: ChannelsInterceptEssentials.get.channel
        
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

    Leave : {
        name: "leave",
        method: "GET",
        socketing: true,
        description: "Leave a channel",
        path: "/leave/:token/:channel_id",
        res: ChannelsInterceptEssentials.leave
    },

    GetMessages : {
        name: "getmessages",
        method: "GET",
        socketing: true,
        description: "Get messages from a channel",
        path: "/get/messages/:token/:channel/:limit",
        res: ChannelsInterceptEssentials.get.messages
    },

    GetMembers : {
        name: "getmembers",
        method: "GET",
        socketing: true,
        description: "Get members from a channel",
        path: "/members/get/:token/:channel_id",
        res: ChannelsInterceptEssentials.get.members
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

    // Groups

    Kick : {
        name: "kick",
        method: "GET",
        socketing: true,
        description: "Kick a user from a channel",
        path: "/kick/:token/:channel_id/:user_id",
        res: ChannelsInterceptGroups.kick
    },

    // Moderation

}