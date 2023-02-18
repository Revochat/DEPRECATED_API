import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"

export const serversUpdate = async (req: express.Request, res: express.Response) => { // Update the channels of the user 
    try {
        const { newservers } = req.body
        const token = req.token

        // if token or newservers badly formatted
        if(!token || !newservers || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            newservers.length > UTILS.CONSTANTS.USER.SERVERS.MAX_LENGTH || newservers.length < UTILS.CONSTANTS.USER.SERVERS.MIN_LENGTH) throw "Badly formatted"

        // if user not found
        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        // check if the servers are all in User.servers (if not the user could add a server that he doesn't have access to)
        for(var i = 0; i < newservers.length; i++) {
            if(!User.servers.includes(newservers[i])) throw "Badly formatted"
        }

        User.servers = newservers
        User.updated_at = new Date().toLocaleString()
        await User.save()

        Emitter.emit("updateChannels", User)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channels updated`)
                .setData(User)
        )
    }

    catch(err) {
        res.status(400)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}