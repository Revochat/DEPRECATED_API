import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"
import UTILS from "../../utils"
import { IRolePermission} from '../../database/models/Role';

export const createRole = async (req: express.Request, res: express.Response) => {
    try {
        const {server_id} = req.params
        const {name, color, position} = req.body
        const permissions = req.body.permissions as IRolePermission
        const token = req.token

        //type checking
        if (!token || !position || !name || !color || !permissions || 
            server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH ||
            token.length < UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || isNaN(parseInt(server_id))) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        var Server = await DB.servers.find.id(parseInt(server_id))
        if (!Server) throw "Server not found"


        // check if user is in server
        if (!Server.members.includes(User.user_id)) throw "User not in server"
        // check if user has permission to create role
        if (!UTILS.FUNCTIONS.CHECK.SERVER.PERMISSIONS(User, Server, UTILS.CONSTANTS.SERVER.PERMISSIONS.ROLES.MANAGE)) throw "User does not have permission to create role"

        // check that position is not already taken
        var Roles = await DB.roles.find.server_id(parseInt(server_id))
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

        // create role
        var Role = await DB.roles.create({
            role_id: Date.now() + Math.floor(Math.random() * 1000),
            role_name: name,
            role_color: color,
            role_members: [],
            role_position: position,
            role_server_id: parseInt(server_id),
            permissions: permissions,
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        })
        if (!Role) throw "Failed to create role"

        // add id to server roles
        Server.roles.push(Role.role_id)

        Emitter.emit("createRole", Role)
        
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Role created`)
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