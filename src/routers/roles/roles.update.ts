import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"
import { IRolePermission } from "../../database/models/Role"
import UTILS from "../../utils"

export const updateRole = async (req: express.Request, res: express.Response) => {
    try {
        const {role_id, name, color} = req.body
        const permissions = req.body.permissions as IRolePermission
        const token = req.token
        
        //type checking
        if (!token || !name || !role_id || !permissions || !color ||
            token.length < UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        var Role = await DB.roles.find.id(role_id)
        if (!Role) throw "Role not found"

        await DB.roles.update(role_id, name, color, permissions)

        Emitter.emit("updateRole", Role)
        
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Role updated`)
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