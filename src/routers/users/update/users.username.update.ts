import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"

export const usernameUpdate = async (req: express.Request, res: express.Response) => { // Update the username
    try {
        const { token, newusername } = req.params

        // if token or newusername badly formatted
        if(!token || !newusername || token.length !== 45 || newusername.length >= 20) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"
        User.username = newusername
        User.updated_at = new Date().toLocaleString()
        User.save() //update the username of the user in the database

        Logger.debug(`User ${User} has been updated`)
        Emitter.emit("updateUsername", User)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Username updated`)
                .setData(User)
        )
    }
    catch(err) {
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}