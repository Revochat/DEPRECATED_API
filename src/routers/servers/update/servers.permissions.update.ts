import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const permissionsUpdate = async (req: express.Request, res: express.Response) => { // Update a server permissions
    var {server_id, user_id} = req.params
    var {permissions} = req.body
    const token = req.token

    Logger.debug(`Updating server permissions ${server_id}`)

    // TYPE CHECK FOR THE PERMISSIONS !!!
    if (!server_id || !user_id || !permissions || !token || server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
        user_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || user_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH || isNaN(parseInt(server_id)) || isNaN(parseInt(user_id))) throw "Badly formatted"

    try {
        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found"

        var Server = await DB.servers.find.id(parseInt(server_id)) // Find the server
        if(!Server) throw "Server not found"

        if(Server.owner_id !== User.user_id) throw "You are not the owner of this server"

        if (!UTILS.FUNCTIONS.CHECK.SERVER.PERMISSIONS(User, Server, UTILS.CONSTANTS.SERVER.PERMISSIONS.ADMIN)) throw "You do not have permission to change the server icon"

        Emitter.emit("updateServerPermissions", Server)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Server permissions updated")
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