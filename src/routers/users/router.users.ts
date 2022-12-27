import { UserIntercept } from "./intercept.users"


export const UserRouter = {
    path: "/client",

    Register: { // Register a new user
        method: "GET",
        path:"/register/:username/:password",
        res: UserIntercept.register
    },

    Connect: {
        method: "GET",
        path: "/connect/:username/:password",
        res: UserIntercept.connect
    },

    GetUserID: {
        method: "GET",
        path: "/get/user/id/:id",
        res: UserIntercept.get.id
    },

    GetUserToken: {
        method: "GET",
        path: "/get/user/token/:token",
        res: UserIntercept.get.token
    },

    Channel: {
        method: "GET",
        path: "/channel/:token",
        res: UserIntercept.channel
    },

    Messages : {      
        method: "GET",                                                
        path: "/messages",
        res: UserIntercept.messages
    },
}