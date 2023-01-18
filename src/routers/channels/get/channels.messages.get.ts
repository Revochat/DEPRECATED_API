import express from "express"
import { RouteResponse, Status } from "../../controller"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const getMessages = async (req: express.Request, res: express.Response) => { // Get the x number of last messages of a channel
    const {channel_id, limit, token} = req.params

    if (!channel_id || !limit || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH || 
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH ||
        limit.length > UTILS.CONSTANTS.SERVER.MESSAGE.MAX_FETCH_LIMIT || limit.length < UTILS.CONSTANTS.SERVER.MESSAGE.MIN_FETCH_LIMIT){ //type check
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        UTILS.FUNCTIONS.find.user.token(token) // Find the user

        if (!limit) throw "Limit not provided"

        if (parseInt(limit) > 100) throw "Limit is too high"

        var Channel = await DB.channels.find.id(parseInt(channel_id))
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