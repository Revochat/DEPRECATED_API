import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"

export const removeRole = async (req: express.Request, res: express.Response) => {
    try {
        const {role_id} = req.body
        const token = req.token
        
        //type checking
        if (!token) throw "Token cannot be empty"
        if (!role_id) throw "Role ID cannot be empty"

        var User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        var Role = await DB.roles.find.id(role_id)
        if (!Role) throw "Role not found"

        // check if user is in the server
        if (!User.servers.includes(Role.role_server_id)) throw "User is not in the server"

        // perm check

        await DB.roles.remove(parseInt(role_id))

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
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}