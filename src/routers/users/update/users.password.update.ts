import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import bcrypt from "bcrypt"

export const passwordUpdate = async (req: express.Request, res: express.Response) => { // Update the password
    try {
        const { token, newpassword } = req.params

        // if token or newpassword badly formatted
        if(!token || !newpassword || token.length !== 45 || newpassword.length >= 30) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"
        User.password = await bcrypt.hash(newpassword, 10)
        User.updated_at = new Date().toLocaleString()
        User.save()
        Logger.debug(`User ${User} has been updated`)
        Emitter.emit("updatePassword", User)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Password updated`)
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