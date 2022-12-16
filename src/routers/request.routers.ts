
import Emitter from "../client/client.emitter"
import DB_Manager from "../database/"
import { RouteResponse } from "./interfaces.routers"
import express from "express"
import { Status } from "./interfaces.routers"
import bcrypt from "bcrypt"

export const RouteIntercept = {

    register : async (req: express.Request, res: express.Response) => { // Register a new user
        const { username, password } = req.params
        Emitter.emit("register", username, password)
        // CHECK IF USER IS NOT ALREADY REGISTERED AND PASSWORD RIGHT FORMAT > 6 char 

        if (await DB_Manager.users.getUser(username)) {
            res.json(
                RouteResponse
                    .setStatus(Status.error)
                    .setMessage(`User already exists`)
            )
        } else {
            await DB_Manager.users.createUser({username: username, password: bcrypt.hashSync(password, 10), created_at: new Date().toUTCString(), updated_at: new Date().toUTCString(), last_connection: new Date().toUTCString()})
            res.json(
                RouteResponse
                    .setStatus(Status.success)
                    .setMessage(`You are connected as ID: ${username} with password: ${password}`)
            )
        }
    },

    connect : (req: express.Request, res: express.Response) => { // Connect a user
        const { username, password } = req.params
        Emitter.emit("connect", username, password)
        // NEED TO CHECK IF THE USER EXISTS IN THE DATABASE AND IF THE PASSWORD IS CORRECT
        res.json(
            RouteResponse
                .setStatus(Status.success)
                .setMessage(`You are connected as ID: ${username} with password: ${password}`)
        )
    },
    
    getUser : (req: express.Request, res: express.Response) => { // Get the user ID
        const { token } = req.params
        Emitter.emit("getUser", token)
        // GET THE USER ID FROM THE TOKEN
        res.json(
            RouteResponse
                .setStatus(Status.success)
                .setMessage(`You are getting the user ID: ${token}`)
        )
    },

    channel: (req: express.Request, res: express.Response): void => {
        Emitter.emit("channel", req.params.token)
        res.json(
            RouteResponse
                .setStatus(Status.success)
                .setMessage(`You are in the channel ID: ${req.params.token}`)
        )
    },

    messages: (req: express.Request, res: express.Response): void => {
        Emitter.emit("messages", req.params.token)
        res.json(
            RouteResponse
                .setStatus(Status.success)
                .setMessage(`You are sending a message to the user ID: ${req.params.token}`)
        )
    },


    // ERROR HANDLER OF WRONG ROUTES
    error : (response: express.Response | null): void => { // Error handler
        // Emitter.emit("error", req.header('x-forwarded-for') || req.connection.remoteAddress)
        response == null ? new Error("Unauthorized function manipulation") : 
        response.json(
            RouteResponse
                .setStatus(Status.error)
                .setMessage("Unauthorized")
        )
    }
}