import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"

export const createRole = async (req: express.Request, res: express.Response) => {
    try {
        const {server_id} = req.params
        const {name, color, position, permissions} = req.body
        const token = req.token
        
        //type checking
        if (!token) throw "Token cannot be empty"

        var User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        var Server = await DB.servers.find.id(parseInt(server_id))
        if (!Server) throw "Server not found"

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

        // add id to server roles
        Server.roles.push(Role.role_id)

        Logger.debug(`Role ${Role} has been created`)
        Emitter.emit("createRole", Role)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Role created`)
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