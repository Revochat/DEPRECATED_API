import { MessagesIntercept } from "./intercept.messages"

export const MessagesRouter = {
    path: "/message",

    Get : {
        method: "GET",
        path: "/get/:token/:message",
        res: MessagesIntercept.get
    }  
}