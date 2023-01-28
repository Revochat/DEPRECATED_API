import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const iconUpdate = async (req: express.Request, res: express.Response) => { // Update a server avatar
    var {server_id} = req.params
    var {server_icon} = req.body
    const token = req.token

    Logger.debug(`Updating server avatar ${server_id}`)

    // CHECK FOR THE AVATAR SIZE !!!
    if (!server_id || !server_icon || !token || server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH ){ //type check
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

        var Server = await DB.servers.find.id(parseInt(server_id)) // Find the server
        if(!Server) throw "Server not found"

        if(Server.owner_id !== User.id) throw "You are not the owner of this server"

        //check perm

        Server.server_icon = server_icon
        await Server.save()

        Emitter.emit("updateServerAvatar", Server)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Server avatar updated")
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