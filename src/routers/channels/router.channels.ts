
import { ChannelsInterceptEssentials } from "./intercept.channels.essentials";
import {ChannelsInterceptModeration} from "./intercept.channels.moderation"

export const ChannelsRouter = {
    path: "/client",

    // Essentials

    Create : {
        method: "GET",
        path: "/create/:token/:channel",
        res: ChannelsInterceptEssentials.create
    },
    Get : {
        method: "GET",

        path: "/get/:token/:channel",
        res: ChannelsInterceptEssentials.get
        
    },
    Delete : {
        method: "GET",
        path: "/delete/:token/:channel",
        res: ChannelsInterceptEssentials.delete
    },
    Update : {
        method: "GET",
        path: "/update/:token/:channel/:newchannel",

        res: ChannelsInterceptEssentials.update
    },
    Join : {
        method: "GET",
        path: "/join/:token/:channel",
        res: ChannelsInterceptEssentials.join
    },
    Leave : {
        method: "GET",
        path: "/leave/:token/:channel",
        res: ChannelsInterceptEssentials.leave
    },
    GetMessages : {
        method: "GET",
        path: "/getmessages/:token/:channel/:limit",
        res: ChannelsInterceptEssentials.getMessages
    },

    // Moderation

    Kick : {
        method: "GET",
        path: "/kick/:token/:channel/:user",
        res: ChannelsInterceptModeration.kick
    },

}