import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const nameUpdate = async (req: express.Request, res: express.Response) => { // Update a server name
    var {server_id, name} = req.params
    const token = req.token

    Logger.debug(`Updating server name ${server_id}`)

    if (!server_id || !name || !token || server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH ||
        name.length < UTILS.CONSTANTS.SERVER.NAME.MIN_LENGTH || name.length > UTILS.CONSTANTS.SERVER.NAME.MAX_LENGTH ){ //type check
        
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

        if(Server.owner_id !== User.user_id) throw "You are not the owner of this server"

        if (!UTILS.FUNCTIONS.PERMISSIONS.hasServerPermission(User, Server, UTILS.CONSTANTS.SERVER.PERMISSIONS.ADMIN)) throw "You do not have permission to change the server name"

        Server.server_name = name
        await Server.save()

        Emitter.emit("updateServerName", Server)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Server name updated")
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