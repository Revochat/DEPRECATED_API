import express from "express"
import { RouteResponse, Status } from "../../controller"
import Logger from "../../../client/logger.client"
import DB from "../../../database"

export const getMessages = async (req: express.Request, res: express.Response) => { // Get the x number of last messages of a channel
    const {channel_id, limit} = req.params

    if (!channel_id || !limit || channel_id.length !== 13 || limit.length > 3){ //type check
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        if (!limit) throw "Limit not provided"

        if (parseInt(limit) > 100) throw "Limit is too high"

        var Channel = await DB.channels.find.id(channel_id)
        if(!Channel) throw "Channel not found"
        Logger.debug(`Getting messages of channel ${Channel}`)

        var Messages = DB.channels.find.messages(channel_id, parseInt(limit)) // needs testing (not sure if it works)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channel messages`)
                .setData(Messages)
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