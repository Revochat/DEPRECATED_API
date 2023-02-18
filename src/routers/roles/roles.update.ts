import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"
import { IRolePermission } from "../../database/models/Role"
import UTILS from "../../utils"

export const updateRole = async (req: express.Request, res: express.Response) => {
    try {
        const {role_id, name, color, position} = req.body
        const permissions = req.body.permissions as IRolePermission
        const token = req.token
        
        //type checking
        if (!token || !name || !role_id || !permissions || !color ||
            token.length < UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        var Role = await DB.roles.find.id(role_id)
        if (!Role) throw "Role not found"

        var Server = await DB.servers.find.id(Role.role_server_id)
        if (!Server) throw "Server not found"

        // check if user is in server
        if (!Server.members.includes(User.user_id)) throw "User not in server"
        // check if user has permission to create role
        if (!UTILS.FUNCTIONS.CHECK.SERVER.PERMISSIONS(User, Server, UTILS.CONSTANTS.SERVER.PERMISSIONS.ROLES.MANAGE)) throw "User does not have permission to create role"

        // check that position is not already taken
        var Roles = await DB.roles.find.server_id(Server.server_id)
        if (!Roles) throw "No roles found"

        Roles.forEach(async (role: any) => { // if position is taken, move all roles with position >= position up one
            if (role.role_position >= position) {
                role.role_position++
                role.updated_at = new Date().toString()
                await role.save()
            }
        })

        // check that role color is valid hex color code
        if (!UTILS.FUNCTIONS.CHECK.ROLE.COLOR(color)) throw "Invalid color"
  

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