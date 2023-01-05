import { MessagesIntercept } from "./intercept.messages"

export const MessagesRouter = {
    path: "/client",

    Send : {
        method: "GET",
        path: "/send/:token/:message",
        res: MessagesIntercept.send
    },
    Delete : {
        method: "GET",
        path: "/delete/:token/:message",
        res: MessagesIntercept.delete
    },
    Get : {
        method: "GET",
        path: "/get/:token/:message",
        res: MessagesIntercept.get
    }  
}