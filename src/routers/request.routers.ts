import Emitter from "../client/client.emitter"
import DB_Manager from "../database/"
import { RouteResponse } from "./interfaces.routers"
import express from "express"
import { Status } from "./interfaces.routers"

export const RouteIntercept = {
    connect : (req: express.Request, res: express.Response) => {
        const { username, password } = req.params
        Emitter.emit("connect", username, password)
        DB_Manager.userTable()
        .createUser({username: username, password: password, created_at: new Date().toUTCString(), updated_at: new Date().toUTCString(), last_connection: new Date().toUTCString() })
        .then(() => {
            console.log("User created")}).catch((err) => {console.log("User not created", err)})
        res.json(
            RouteResponse
                .setStatus(Status.success)
                .setMessage(`You are connect as ID: ${username} with password: ${password}`)
        )
    }
}