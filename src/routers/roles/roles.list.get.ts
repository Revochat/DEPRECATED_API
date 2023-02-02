import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"

export const getRoles = async (req: express.Request, res: express.Response) => {
    try {
        const {server_id} = req.params
        const token = req.token
        
        //type checking
        if (!token) throw "Token cannot be empty"

        var User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        var Server = await DB.servers.find.id(parseInt(server_id))
        if (!Server) throw "Server not found"

        // check if user is in the server
        if (!User.servers.includes(server_id)) throw "User is not in the server"

        var Roles = Server.permissions_id
        const roles = []

        if (Roles.length != 0) {
            for (var i = 0; i < Roles.length; i++) {
                roles.push(await DB.roles.find.id(Roles[i]))
            }
        }

        Emitter.emit("getRoles", roles)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Roles found`)
                .setData(roles)
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