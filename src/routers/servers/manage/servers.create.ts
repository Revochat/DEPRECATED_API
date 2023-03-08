import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const create = async (req: express.Request, res: express.Response) => { // Create a server channel 
    var {name} = req.params
    const token = req.token

    if (!name || !token || name.length < UTILS.CONSTANTS.SERVER.NAME.MIN_LENGTH || name.length > UTILS.CONSTANTS.SERVER.NAME.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH) throw "Badly formatted"

    try {
        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found"

        if (User.servers.length >= UTILS.CONSTANTS.USER.MAX_SERVERS) throw "You have reached the max amount of servers"

        // create the server
        var Server = await DB.servers.create({ 
            server_id: Date.now() + Math.floor(Math.random() * 1000),
            server_name: name,
            owner_id: parseInt(User.user_id),
            channels: [],
            members: [new Map([[String(User.user_id), []]])],
            members_count: 1,
            updated_at: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
            roles: []
        })
        if (!Server) throw "Failed to create server"
        
        await Server.save() // Save the server to the database

        // add the server to the user
        User.servers.push(Server.server_id)
        await User.save()

        Emitter.emit("createServer", Server)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Server created")
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