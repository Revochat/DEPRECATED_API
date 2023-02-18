import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"
import UTILS from "../../utils"

export const inviteGet = async (req: express.Request, res: express.Response) => { // Get an invite
    var {invite_id} = req.params
    const token = req.token

    if (!invite_id || !token || invite_id.length < UTILS.CONSTANTS.INVITE.ID.MIN_LENGTH || invite_id.length > UTILS.CONSTANTS.INVITE.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH) throw "Badly formatted"

    try {
        var User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        var Invite = await DB.invites.find.id(parseInt(invite_id))
        if (!Invite) throw "Invite not found"

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Invite found")
                .setData(Invite)
        )
    }

    catch (err) {
        res.status(400)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}