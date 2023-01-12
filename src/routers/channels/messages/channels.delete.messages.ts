import express from "express"
import { RouteResponse, Status } from "../../controller"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"

export const deleteMessage = async (req: express.Request, res: express.Response) => { // Delete a message from a channel
    const {channel_id, user_id, message_id} = req.body

    if (!channel_id || !user_id || !message_id || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        message_id.length < UTILS.CONSTANTS.MESSAGE.ID.MIN_LENGTH || message_id.length > UTILS.CONSTANTS.MESSAGE.ID.MAX_LENGTH ||
        user_id < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || user_id > UTILS.CONSTANTS.USER.ID.MAX_LENGTH){ //type check
        
            res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var Channel = await DB.channels.find.id(channel_id)
        if(!Channel) throw "Channel not found"
        Logger.debug(`Deleting message from channel ${Channel}`)

        // Check if the user is in the channel
        if (!Channel.members.includes(user_id)) throw "You are not in this channel"

        // Delete the message
        var Message = await DB.messages.find.id(message_id)
        if(!Message) throw "Message not found"
        await Message.delete()

        Emitter.emit("deleteMessage", Message)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Message deleted`)
                .setData(Message)
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