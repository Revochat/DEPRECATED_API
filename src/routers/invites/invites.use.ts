import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"
import UTILS from "../../utils"

export const inviteUse = async (req: express.Request, res: express.Response) => { // Use an invite for a server
    var {invite_id} = req.params
    const token = req.token

    Logger.debug(`Using invite ${invite_id}`)
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

        // var Invite = await DB.invites.find.id(parseInt(invite_id)) // Find the invite
        // if(!Invite) throw "Invite not found"

        // var Server = await DB.servers.find.id(parseInt(Invite.server_id)) // Find the server
        // if(!Server) throw "Server not found"

        // // add the user to the server
        // if(!Server.user_ids) Server.user_ids = []
        // Server.user_ids.push(parseInt(User.user_id))

        // await Server.save()

        // Emitter.emit("useInvite", Invite)

        // res.json(
        //     new RouteResponse()
        //         .setStatus(Status.success)
        //         .setMessage("Invite used")
        //         .setData({
        //             server_id: Server.server_id
        //         })
        // )
    }

    catch (err) {
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}