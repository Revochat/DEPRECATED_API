import express from "express"
import Emitter from "../client/client.emitter"
import {InterceptRoute, RouteResponse, Status} from "./"
import DB_Manager from "../database/"
import { RouteIntercept } from "./request.routers"

export const Intercept = { // Intercept the requests and responses and route them to the right function, this is the main router and all the other routers are children of this router
    path: "/api",

    // CLIENT SIDE ROUTES

    V1: {
        path: "/v1",
        Users: {
            path: "/client",
    
            // PUBLIC ADDRESS IS THE PUBLIC ADDRESS OF THE USER THAT YOU ARE CONNECTING TO WITH METAMASK
    
            Register: {
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
    
            // CHANNEL IS THE PUBLIC ADDRESS OF THE USER THAT YOU ARE CONNECTING TO OR THE PUBLIC ADDRESS OF THE CHANNEL THAT YOU ARE CONNECTING TO
    
            Channel: {
                path: "/channel/:token",
                res: RouteIntercept.channel
            },
    
            // WE CAN'T SEE YOUR MESSAGES, WE CAN ONLY SEE THE PUBLIC ADDRESS OF THE USER THAT YOU ARE SENDING THE MESSAGE TO
    
            Messages : {                                                        
                path: "/messages",
                Send: {
                    path: "/send/:token",
                    res: (req: express.Request, res: express.Response): void => {
                        Emitter.emit("messages", req.params.token)
                        res.json(
                            RouteResponse
                                .setStatus(Status.success)
                                .setMessage(`You are sending a message to the user ID: ${req.params.token}`)
                        )
                    },
                },
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
