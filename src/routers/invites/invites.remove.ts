import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"
import UTILS from "../../utils"

export const inviteRemove = async (req: express.Request, res: express.Response) => { // Remove an invite
    var {invite_id} = req.params
    const token = req.token

    Logger.debug(`Removing invite ${invite_id}`)

    if (!invite_id || !token || invite_id.length < UTILS.CONSTANTS.INVITE.ID.MIN_LENGTH || invite_id.length > UTILS.CONSTANTS.INVITE.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH
        ) { //type check
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found"

        var Invite = await DB.invites.find.id(parseInt(invite_id)) // Find the invite
        if(!Invite) throw "Invite not found"

        var Server = await DB.servers.find.id(Invite.server_id) // Find the server
        if(!Server) throw "Server not found"

        // check permissions
        if (!UTILS.FUNCTIONS.PERMISSIONS.hasServerPermission(User, Server, UTILS.CONSTANTS.SERVER.PERMISSIONS.ADMIN)) throw "You do not have permission to create invites"

        // remove the invite
        await DB.invites.remove(parseInt(invite_id))

        Emitter.emit("removeInvite", Invite)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Invite removed")
        )
    }

    catch (err) {
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}