import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"

export const usernameUpdate = async (req: express.Request, res: express.Response) => { // Update the username
    try {
        const { newusername } = req.body
        const token = req.token

        // if token or newusername badly formatted
        if(!token || !newusername || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            newusername.length >= UTILS.CONSTANTS.USER.USERNAME.MAX_LENGTH || newusername.length < UTILS.CONSTANTS.USER.USERNAME.MIN_LENGTH) throw "Badly formatted"

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