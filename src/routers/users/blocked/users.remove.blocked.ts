import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"

export const removeBlocked = async (req: express.Request, res: express.Response) => { // Remove a blocked user from the user
    try {
        const { blocked_id } = req.params
        const token = req.token

        // if token or blocked_id badly formatted
        if(!token || !blocked_id || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            blocked_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || blocked_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH || isNaN(parseInt(blocked_id))) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "Invalid token"

        // check if the user is already blocked
        if(!User.blocked.includes(blocked_id)) throw "User not blocked"

        // remove the blocked user from the user
        User.blocked.splice(User.blocked.indexOf(blocked_id), 1)
        User.updated_at = new Date().toLocaleString()
        User.save()
        
        Emitter.emit("removeBlocked", User)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Blocked removed`)
                .setData(User)
        )
    }

    catch(err) {
        res.status(400)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}