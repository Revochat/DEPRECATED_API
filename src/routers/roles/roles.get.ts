import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"
import UTILS from "../../utils"

export const getRole = async (req: express.Request, res: express.Response) => { // get a role by id
    try {
        const {role_id, server_id} = req.params
        const token = req.token

        const role_id_input = parseInt(role_id) //type checking
        
        //type checking
        if (!role_id || !token || !token || server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH ||
            role_id_input  < UTILS.CONSTANTS.ROLE.ID.MIN_LENGTH || role_id_input > UTILS.CONSTANTS.ROLE.ID.MAX_LENGTH ||
            token.length < UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH){ //type check
            
                res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("Badly formatted")
            )
            return
        }

        var User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        var Role = await DB.roles.find.id(role_id_input)
        if (!Role) throw "Role not found"

        // check if user is in the server
        if (!User.servers.includes(server_id)) throw "User is not in the server"

        Logger.debug(`Role ${Role} has been found`)
        Emitter.emit("getRole", Role)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Role found`)
                .setData(Role)
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