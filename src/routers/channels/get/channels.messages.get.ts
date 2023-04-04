import express from "express"
import { RouteResponse, Status } from "../../controller"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const getMessages = async (req: express.Request, res: express.Response) => { // Get the x number of last messages of a channel
    try {
        const {channel_id, limit} = req.params
        const token = req.token
    
        if (!token || !channel_id || !limit || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH || 
            token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            limit.length > UTILS.CONSTANTS.SERVER.MESSAGE.MAX_FETCH_LIMIT || limit.length < UTILS.CONSTANTS.SERVER.MESSAGE.MIN_FETCH_LIMIT || isNaN(parseInt(channel_id))) throw "Badly formatted"

        var User = await UTILS.FUNCTIONS.FIND.USER.token(token)
        if (!User) throw "User not found"

        var Channel = await DB.channels.find.id(parseInt(channel_id))
        if(!Channel) throw "Channel not found"

        if (!Channel.members.includes(User.user_id)) throw "You are not a member of this channel"

        var Messages = await DB.channels.find.messages(channel_id, parseInt(limit))

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channel messages`)
                .setData(Messages)
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