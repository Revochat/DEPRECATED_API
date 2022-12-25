
import Emitter from "../client/emitter.client"

import { RouteResponse} from "./interfaces.routers"
import express from "express"
import { Status } from "./interfaces.routers"

export const RouteIntercept = {

    register : async (req: express.Request, res: express.Response) => { // Register a new user
        const { username, password } = req.params
        Emitter.emit("register", username)
        try {
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`You are registering the user: ${username}`)
            )
        }
        catch (err) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },

    connect : async (req: express.Request, res: express.Response) => { // Connect a user
        const { username, password } = req.params
        try {
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`You are registering the user: ${username}`)
            )
        }
        catch(err) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },
    
    getUser : (req: express.Request, res: express.Response) => { // Get the user ID
        const { token } = req.params
        Emitter.emit("getUser", token)
        // GET THE USER ID FROM THE TOKEN
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`You are getting the user ID: ${token}`)
        )
    },

    channel: (req: express.Request, res: express.Response): void => {
        Emitter.emit("channel", req.params.token)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`You are in the channel ID: ${req.params.token}`)
        )
    },

    messages: (req: express.Request, res: express.Response): void => {
        Emitter.emit("messages", req.params.token)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`You are sending a message to the user ID: ${req.params.token}`)
        )
    },


    // ERROR HANDLER OF WRONG ROUTES
    error : (_: any, response: express.Response | null): void => { // Error handler
        // Emitter.emit("error", req.header('x-forwarded-for') || req.connection.remoteAddress)
        response == null ? new Error("Unauthorized function manipulation") : 
        response.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Unauthorized")
        )
    }
}