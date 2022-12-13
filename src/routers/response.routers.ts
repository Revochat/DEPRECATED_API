import express from "express"
import Emitter from "../client/client.emitter"
import {InterceptRoute, RouteResponse, Status} from "./"

export const Intercept = { // Intercept the requests and responses and route them to the right function, this is the main router and all the other routers are children of this router
    path: "/api",

    // CLIENT SIDE ROUTES

    Users: {
        path: "/client",

        // PUBLIC ADDRESS IS THE PUBLIC ADDRESS OF THE USER THAT YOU ARE CONNECTING TO WITH METAMASK

        Connect: {
            path:"/connect/:publicAddress",
            res: (req: express.Request, res: express.Response) : void => {
                Emitter.emit("connect", req.params.publicAddress)
                res.json(
                    RouteResponse
                        .setStatus(Status.success)
                        .setMessage(`You are connect as ID: ${req.params.publicAddress}`)
                )
            }
        },

        // CHANNEL IS THE PUBLIC ADDRESS OF THE USER THAT YOU ARE CONNECTING TO OR THE PUBLIC ADDRESS OF THE CHANNEL THAT YOU ARE CONNECTING TO

        Channel: {
            path: "/channel/:token",
            res: (req: express.Request, res: express.Response): void => {
                Emitter.emit("channel", req.params.token)
                res.json(
                    RouteResponse
                        .setStatus(Status.success)
                        .setMessage(`You are in the channel ID: ${req.params.token}`)
                )
            }
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


    Admin : {
        path: "/admin",

        Users: {
            path: "/users",
            res: (req: express.Request, res: express.Response): void => {
                Emitter.emit("admin", "users")
                res.json(
                    RouteResponse
                        .setStatus(Status.success)
                        .setMessage("You are in the admin panel")
                )
            }
        }
    },

    // ERROR HANDLER OF WRONG ROUTES // PATH * ALWAYS AT THE END

    Errors : {
        path: "*",
        E404: {
            path: "",
            res: (req: express.Request, response: express.Response | null): void => {
                // Emitter.emit("error", req.header('x-forwarded-for') || req.connection.remoteAddress)
                response == null ? new Error("Unauthorized function manipulation") : 
                response.json(
                    RouteResponse
                        .setStatus(Status.error)
                        .setMessage("Unauthorized")
                )
            }
        }
    }
    
}
