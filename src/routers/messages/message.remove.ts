import express from "express"
import { RouteResponse, Status } from "../controller"
import Logger from "../../client/logger.client"
import DB from "../../database"
import Emitter from "../../client/emitter.client"
import { IMessageModel } from "../../database/models/Message"
import { v4, v5 } from "uuid"
import UTILS from "../../utils"

export const remove = async (req: express.Request, res: express.Response) => { // Delete a message from a channel
    try {
        const {channel_id, message_id} = req.params
        const token = req.token

        if (!channel_id || !token || !message_id || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
            message_id.length < UTILS.CONSTANTS.MESSAGE.ID.MIN_LENGTH || message_id.length > UTILS.CONSTANTS.MESSAGE.ID.MAX_LENGTH ||
            token.length < UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH){ //type check
            
                res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("Badly formatted")
            )
            return
        }

        var User = await UTILS.FUNCTIONS.FIND.USER.token(token) // Find the user

        var Channel = await DB.channels.find.id(parseInt(channel_id))
        if(!Channel) throw "Channel not found"

        if (Channel.server_id) throw "Channel is not a server channel"

        // check if channel is a text channel
        if (Channel.channel_type == UTILS.CONSTANTS.CHANNEL.TYPE.VOICE) throw "Channel is not a text channel"

        // Check if the user is in the channel
        if (!Channel.members.includes(User.user_id)) throw "You are not in this channel"

        // Check if the message is not his own message
        var Message = await DB.messages.find.id(message_id)
        if(!Message) throw "Message not found"
        if (Message.user_id != User.user_id) { // If the message is not his own message
            if (!UTILS.FUNCTIONS.CHECK.CHANNEL.PERMISSIONS(User, Channel, UTILS.CONSTANTS.CHANNEL.PERMISSIONS.ADMIN)) throw "You do not have permission to delete others messages in this channel"
        }

        Logger.debug(`Deleting message from channel ${Channel}`)

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