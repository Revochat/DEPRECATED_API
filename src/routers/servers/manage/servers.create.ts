import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const create = async (req: express.Request, res: express.Response) => { // Create a server channel 
    var {server_name, server_id, token} = req.params

    if (!server_name || !server_id || !token || server_name.length < UTILS.CONSTANTS.SERVER.NAME.MIN_LENGTH || server_name.length > UTILS.CONSTANTS.SERVER.NAME.MAX_LENGTH ||
        server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH ){ //type check
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found"

        if (User.server.length >= UTILS.CONSTANTS.SERVER.MAX_SERVER) throw "You have reached the maximum number of created servers"

        // create the server
        var Server = await DB.servers.create({ 
            server_id: parseInt(server_id),
            server_name: server_name,
            owner_id: User.id,
            channels: [],
            members: new Map([[User.id, []]]),
            members_count: 1,
            updated_at: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
            permissions_id: []
        })
        if(!Server) throw "Server not created"

        Server.save() // save the server

        Emitter.emit("server", User.id, Server) // send the server to the user

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Server created")
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