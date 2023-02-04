import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"

export const updateRole = async (req: express.Request, res: express.Response) => {
    try {
        const {role_id, name, permissions} = req.body
        const token = req.token
        
        //type checking
        if (!token) throw "Token cannot be empty"
        if (!role_id) throw "Role ID cannot be empty"
        if (!name) throw "Name cannot be empty"
        if (!permissions) throw "Permissions cannot be empty"

        var User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        var Role = await DB.roles.find.id(role_id)
        if (!Role) throw "Role not found"

        // await DB.roles.update(role_id, name, permissions)

        Logger.debug(`Role ${Role} has been updated`)
        Emitter.emit("updateRole", Role)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Role updated`)
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