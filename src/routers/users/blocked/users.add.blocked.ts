import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"

export const addBlocked =  async (req: express.Request, res: express.Response) => { // Add a blocked user to the user
    try {
        const { blocked_id } = req.params
        const token = req.token

        // if token or blocked_id badly formatted
        if(!token || !blocked_id || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            blocked_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || blocked_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "Invalid token"

        // check if the user is already blocked
        if(User.blocked.includes(blocked_id)) throw "User already blocked"

        // check if the user exists
        if (!await DB.users.find.id(parseInt(blocked_id))) throw "User doesn't exist"

        // add the blocked user to the user
        User.blocked.push(parseInt(blocked_id))
        User.updated_at = new Date().toLocaleString()
        User.save()

        Emitter.emit("addBlocked", User)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Blocked added`)
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