
import { ChannelsInterceptEssentials } from "./intercept.channels.essentials";
import {ChannelsInterceptModeration} from "./intercept.channels.moderation"

export const ChannelsRouter = {
    path: "/channel",

    // Essentials

    Create : {
        method: "GET",
        path: "/create/:token/:channel_name",
        res: ChannelsInterceptEssentials.create
    },
    Get : {
        method: "GET",

        path: "/get/:token/:channel_id",
        res: ChannelsInterceptEssentials.get
        
    },
    Delete : {
        method: "GET",
        path: "/remove/:token/:channel_id",
        res: ChannelsInterceptEssentials.remove
    },
    Update : {
        method: "GET",
        path: "/update/:token/:channel_id",

        res: ChannelsInterceptEssentials.update
    },
    Join : {
        method: "GET",
        path: "/join/:token/:channel_id",
        res: ChannelsInterceptEssentials.join
    },
    Leave : {
        method: "GET",
        path: "/leave/:token/:channel_id",
        res: ChannelsInterceptEssentials.leave
    },
    GetMessages : {
        method: "GET",
        path: "/getmessages/:token/:channel/:limit",
        res: ChannelsInterceptEssentials.getMessages
    },

    GetMembers : {
        method: "GET",
        path: "/getmembers/:token/:channel_id",
        res: ChannelsInterceptEssentials.getMembers
    },

    // Messages

    SendMessage : {
        method: "GET",
        path: "/sendmessage/:token/:channel_id/:message",
        res: ChannelsInterceptEssentials.sendMessage
    },
    DeleteMessage : {
        method: "GET",
        path: "/deletemessage/:token/:channel_id/:message",
        res: ChannelsInterceptEssentials.deleteMessage
    },

    // Moderation

    Kick : {
        method: "GET",
        path: "/kick/:token/:channel_id/:user",
        res: ChannelsInterceptModeration.kick
    },

}