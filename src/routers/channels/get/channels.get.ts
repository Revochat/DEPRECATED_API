import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"


export const getChannel = async (req: express.Request, res: express.Response) => { // Get a channel data by ID
    const {channel_id, token} = req.params

    if (!channel_id || !token || channel_id.length !== 13 || token.length !== 45){ //type check
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        // Check if the user is a member of the channel
        if (!User.channels.includes(channel_id)) throw "You are not a member of this channel"

        var Channel = await DB.channels.find.id(channel_id)
        if(!Channel) throw "Channel not found"
        Logger.debug(`Channel ${Channel} has been found`)
        Emitter.emit("getChannel", Channel)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channel found`)
                .setData(Channel)
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