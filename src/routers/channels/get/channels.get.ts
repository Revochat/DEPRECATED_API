import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const getChannel = async (req: express.Request, res: express.Response) => { // Get a channel data by ID
    const {channel_id} = req.params
    const token = req.token

    if (!channel_id || !token || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ) throw "Badly formatted"

    try {
        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        // Check if the user is a member of the channel
        if (!User.channels.includes(channel_id)) throw "You are not a member of this channel"

        var Channel = await DB.channels.find.id(parseInt(channel_id))
        if(!Channel) throw "Channel not found"
        
        Emitter.emit("getChannel", Channel)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channel found`)
                .setData(Channel)
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