import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"
import UTILS from "../../utils"

export const inviteCreate = async (req: express.Request, res: express.Response) => { // Create an invite for a server
    var {server_id} = req.params
    const token = req.token
    const {uses, expires_at} = req.body

    if (!server_id || !token || !uses || !expires_at || 
        server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || expires_at instanceof Date || uses instanceof Number || isNaN(parseInt(server_id))
        ) throw "Badly formatted"

    try {
        if (expires_at < new Date().toLocaleString()) throw "Invalid expiration date"

        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found"

        var Server = await DB.servers.find.id(parseInt(server_id)) // Find the server
        if(!Server) throw "Server not found"

        if (!UTILS.FUNCTIONS.CHECK.SERVER.PERMISSIONS(User, Server, UTILS.CONSTANTS.SERVER.PERMISSIONS.ADMIN)) throw "You do not have permission to create invites"

        // create an invite for the server
        var Invite = await DB.invites.create({
            server_id: parseInt(server_id),
            invite_id: Date.now() + Math.floor(Math.random() * 1000),
            created_at: new Date().toLocaleString(),
            expires_at: new Date().toLocaleString(),
            uses: uses,
            inviter_id: parseInt(User.user_id)
        })

        // // add the invite to the server
        if(!Server.invite_ids) Server.invite_ids = []
        if(!Invite) throw "Invite not found"
        Server.invite_ids.push(Invite.invite_id)

        await Server.save()

        Emitter.emit("createInvite", Invite)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Invite created")
                .setData({
                    invite: Invite
                })
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