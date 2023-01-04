import { MessagesIntercept } from "./intercept.messages"

export const MessagesRouter = {
    path: "/client",

    Send : {
        method: "GET",
        path: "/send/:token/:message",
        res: MessagesIntercept.send
    }
}