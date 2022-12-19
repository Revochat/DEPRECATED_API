
import Emitter from "../client/client.emitter"
import DB_Manager from "../database/"
import { RouteResponse} from "./interfaces.routers"
import express from "express"
import { Status } from "./interfaces.routers"
import bcrypt, { hashSync } from "bcrypt"
import { User, UserConnect, UserInterface } from "../client"

export const RouteIntercept = {

    register : async (req: express.Request, res: express.Response) => { // Register a new user
        const { username, password } = req.params
        Emitter.emit("register", username)
        console.log("I'm here: " + username + " " + password)
        try {
            var user = await DB_Manager.users.getUser(username, password);
            if (typeof user === "boolean")
            await DB_Manager.users.createUser({token: DB_Manager.users.generateUserToken() ,username: username, password: bcrypt.hashSync(password, 10), created_at: new Date().toUTCString(), updated_at: new Date().toUTCString(), last_connection: new Date().toUTCString()}),
                res.json(
                    new RouteResponse()
                        .setStatus(Status.success)
                        .setMessage(`You are registered as ${username}`)
                )
            else 
                res.json(
                    new RouteResponse()
                        .setStatus(Status.error)
                        .setMessage(`Error User already exists`)
                )
        }
        catch (err) {
            console.log("Here, I'm an error")
            console.log(err)
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
            var user: boolean | UserInterface = await DB_Manager.users.getUser(username, password);
            Emitter.emit("connect", username, password)
            // NEED TO CHECK IF THE USER EXISTS IN THE DATABASE AND IF THE PASSWORD IS CORRECT
            if (typeof user === "object") {
                if (await bcrypt.compare(password, user.password)) 
                    res.json(
                        new RouteResponse()
                            .setStatus(Status.success)
                            .setMessage(`You are connected as ${username}`)
                            .setData(user as UserInterface)
                    )
            else 
                res.json(
                    new RouteResponse()
                        .setStatus(Status.success)
                        .setMessage(`Error`)
                )              
            }
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