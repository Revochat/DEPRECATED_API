import { MessagesIntercept } from "./intercept.messages"

export const MessagesRouter = {
    path: "/message",

    Get : {
        name : "get",
        method: "GET",
        path: "/get/:token/:message_id",
        socketing: true,
        description: "Get a message",
        params: ["token", "message_id"],
        res: MessagesIntercept.get
    }, 
    Send : {
        name: "send",
        method: "POST",
        socketing: false,
        description: "Send a message to a channel",
        path: "/send/:channel_id",
        params: ["token", "channel_id", "message"],
        res: MessagesIntercept.send
    },
    Remove : { // Delete a message from a channel
        name: "remove",
        method: "GET",
        socketing: false,
        description: "Remove a message from a channel",
        path: "/remove/:channel_id/:message_id",
        params: ["token", "channel_id", "message_id"],
        res: MessagesIntercept.remove
    },
}