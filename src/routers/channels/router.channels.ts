
import { ChannelsIntercept } from "./intercept.channels";

export const ChannelsRouter = {
    path: "/client",

    Create : {
        method: "GET",
        path: "/create/:token/:channel",
        res: ChannelsIntercept.create
    },
    Get : {
        method: "GET",

        path: "/get/:token/:channel",
        res: ChannelsIntercept.get
        
    },
    Delete : {
        method: "GET",
        path: "/delete/:token/:channel",
        res: ChannelsIntercept.delete
    },
    Update : {
        method: "GET",
        path: "/update/:token/:channel/:newchannel",

        res: ChannelsIntercept.update
    }

    // kick and invite members ?

}