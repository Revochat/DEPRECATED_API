import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const userKick = async (req: express.Request, res: express.Response) => {
    try {
        var {server_id, user_id} = req.params
        const token = req.token
    
        if (!server_id || !user_id || !token || server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH ||
            user_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || user_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH ||
            token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || isNaN(parseInt(server_id)) || isNaN(parseInt(user_id))) throw "Badly formatted"
    
        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found"

        var Server = await DB.servers.find.id(parseInt(server_id)) // Find the server
        if(!Server) throw "Server not found"

        // Check if user is a member of the server
        if (!UTILS.FUNCTIONS.FIND.SERVER.member(User.user_id, Server)) throw "You are not a member of this server"

        // check if user_id is in Server.members
        if (!UTILS.FUNCTIONS.FIND.SERVER.member(parseInt(user_id), Server)) throw "User is not a member of this server"

        // check permissions of user
        if (!UTILS.FUNCTIONS.CHECK.SERVER.PERMISSIONS(User, Server, UTILS.CONSTANTS.SERVER.PERMISSIONS.ADMIN)) throw "You do not have permission to kick users"

        // remove the user from the server members array of maps
        delete Server.members[parseInt(user_id)]

        Emitter.emit("updateKick", Server)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("User kicked")
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