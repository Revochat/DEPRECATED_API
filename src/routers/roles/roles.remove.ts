import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"
import UTILS from "../../utils"

export const removeRole = async (req: express.Request, res: express.Response) => {
    try {
        const {role_id_input} = req.body
        const token = req.token
        
        //type checking
        if (!role_id_input || !token || !token ||
            role_id_input  < UTILS.CONSTANTS.ROLE.ID.MIN_LENGTH || role_id_input > UTILS.CONSTANTS.ROLE.ID.MAX_LENGTH ||
            token.length < UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || isNaN(parseInt(role_id_input))) throw "Badly formatted"

        const role_id = parseInt(role_id_input) //type checking

        var User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        var Role = await DB.roles.find.id(role_id)
        if (!Role) throw "Role not found"

        // check if user is in the server
        if (!User.servers.includes(Role.role_server_id)) throw "User is not in the server"

        await DB.roles.remove(role_id_input)

        Logger.debug(`Role ${Role} has been removed`)
        Emitter.emit("removeRole", Role)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Role removed`)
                .setData(Role)
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