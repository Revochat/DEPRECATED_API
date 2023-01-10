import { MessagesIntercept } from "./intercept.messages"

export const MessagesRouter = {
    path: "/message",

    Get : {
        name : "get",
        method: "GET",
        path: "/get/:token/:message_id",
        res: MessagesIntercept.get
    }  
}