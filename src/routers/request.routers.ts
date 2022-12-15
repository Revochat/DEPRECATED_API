import Emitter from "../client/client.emitter"
import DB_Manager from "../database/"
import { RouteResponse } from "./interfaces.routers"
import express from "express"
import { Status } from "./interfaces.routers"
import bcrypt from "bcrypt"

export const RouteIntercept = {
    register : (req: express.Request, res: express.Response) => {
        const { username, password } = req.params
        Emitter.emit("register", username, password)
        DB_Manager.users
        .createUser({username: username, password: bcrypt.hashSync(password, 10), created_at: new Date().toUTCString(), updated_at: new Date().toUTCString(), last_connection: new Date().toUTCString() })
        .then(() => {
            console.log("User created")}).catch((err) => {console.log("User not created", err)})
        res.json(
            RouteResponse
                .setStatus(Status.success)
                .setMessage(`You are connected as ID: ${username} with password: ${password}`)
        )
    },
    connect : (req: express.Request, res: express.Response) => {
        const { username, password } = req.params
        Emitter.emit("connect", username
        , password
        )
        res.json(
            RouteResponse
                .setStatus(Status.success)
                .setMessage(`You are connected as ID: ${username} with password: ${password}`)
        )
    },
    getUser : (req: express.Request, res: express.Response) => {
        const { token } = req.params
        Emitter.emit("getUser", token)
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


    error : (req: express.Request, response: express.Response | null): void => {
        // Emitter.emit("error", req.header('x-forwarded-for') || req.connection.remoteAddress)
        response == null ? new Error("Unauthorized function manipulation") : 
        response.json(
            RouteResponse
                .setStatus(Status.error)
                .setMessage("Unauthorized")
        )
    }
}