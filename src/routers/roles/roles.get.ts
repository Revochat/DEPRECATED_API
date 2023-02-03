import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"

export const getRole = async (req: express.Request, res: express.Response) => { // get a role by id
    try {
        const {id, server_id} = req.params
        const token = req.token
        
        //type checking
        if (!token) throw "Token cannot be empty"

        var User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        var Role = await DB.roles.find.id(parseInt(id))
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