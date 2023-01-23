import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"

export const statusUpdate = async (req: express.Request, res: express.Response) => { // Update the status
    try {
        const { newstatus } = req.body
        const token = req.token

        // if token or newstatus badly formatted
        if(!token || !newstatus || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH ||
            !UTILS.CONSTANTS.USER.STATUS.includes(newstatus)) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        User.status = newstatus
        User.updated_at = new Date().toLocaleString()
        User.save() //update the status of the user in the database

        Logger.debug(`User ${User} has been updated`)
        Emitter.emit("updateStatus", User)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Status updated`)
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