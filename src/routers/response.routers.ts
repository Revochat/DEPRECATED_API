import { RouteIntercept } from "./request.routers"

export const Intercept = { // Intercept the requests and responses and route them to the right function, this is the main router and all the other routers are children of this router
    path: "/api", // CLIENT SIDE ROUTES

    V1: { // Version 1 of the API
        path: "/v1",
        Users: {
            path: "/client",
    
            Register: { // Register a new user
                path:"/register/:username/:password",
                res: RouteIntercept.register
            },

            Connect: {
                path: "/connect/:username/:password",
                res: RouteIntercept.connect
            },

            GetUser: {
                path: "/getUser/:token",
                res: RouteIntercept.getUser
            },
    
            Channel: {
                path: "/channel/:token",
                res: RouteIntercept.channel
            },
    
            Messages : {                                                      
                path: "/messages",
                res: RouteIntercept.messages
            },
        },
    },

    // ERROR HANDLER OF WRONG ROUTES // PATH * ALWAYS AT THE END OF THE ROUTER OBJECT 
    
    Errors : {
        path: "*",
        E404: {
            path: "",
            res: RouteIntercept.error
        }
    }
    
}
