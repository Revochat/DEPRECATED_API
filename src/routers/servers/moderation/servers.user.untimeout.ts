import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const userUnTimeout = async (req: express.Request, res: express.Response) => {
    var {server_id, user_id} = req.params
    const token = req.token

    if (!server_id || !user_id || !token || server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH ||
        user_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || user_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH) throw "Badly formatted"

    try {
        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found"

        var Server = await DB.servers.find.id(parseInt(server_id)) // Find the server
        if(!Server) throw "Server not found"

        if (!Server.timeouts) throw "Server does not have timeouted users"

        // Check if user is a member of the server
        if (!UTILS.FUNCTIONS.FIND.SERVER.member(User.user_id, Server)) throw "You are not a member of this server"

        // check if user_id is in Server.members
        if (!UTILS.FUNCTIONS.FIND.SERVER.member(parseInt(user_id), Server)) throw "User is not a member of this server"

        // check permissions of user
        if (!UTILS.FUNCTIONS.CHECK.SERVER.PERMISSIONS(User, Server, UTILS.CONSTANTS.SERVER.PERMISSIONS.ADMIN)) throw "You do not have permission to untimeout users"

        // remove the user from the server members array of maps
        if (Server.timeouts?.includes(parseInt(user_id))) throw "User is not timed out"
        Server.timeouts?.splice(Server.timeouts.indexOf(parseInt(user_id)), 1)

        Emitter.emit("updateUnTimeout", Server)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("User untimeouted")
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