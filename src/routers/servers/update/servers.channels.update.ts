import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const channelsUpdate = async (req: express.Request, res: express.Response) => { // Update order of channels in a server
    var {server_id} = req.params
    var {new_channel_order} = req.body
    const token = req.token

    Logger.debug(`Updating channel order ${server_id}`)

    if (!server_id || !new_channel_order || !token || server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
        !Array.isArray(new_channel_order) || new_channel_order.length <= UTILS.CONSTANTS.SERVER.MIN_CHANNELS || new_channel_order.length > UTILS.CONSTANTS.SERVER.MAX_CHANNELS
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

        var Server = await DB.servers.find.id(parseInt(server_id)) // Find the server
        if(!Server) throw "Server not found"

        if(Server.owner_id !== User.user_id) throw "You are not the owner of this server"

        if (!UTILS.FUNCTIONS.PERMISSIONS.hasServerPermission(User, Server, UTILS.CONSTANTS.SERVER.PERMISSIONS.ADMIN)) throw "You do not have permission to change the server icon"

        Server.channels = new_channel_order
        await Server.save()

        Emitter.emit("updateServerChannels", Server)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Server Channels order updated")
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
