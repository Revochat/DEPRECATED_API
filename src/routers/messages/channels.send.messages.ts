import express from "express"
import { RouteResponse, Status } from "../controller"
import Logger from "../../client/logger.client"
import DB from "../../database"
import Emitter from "../../client/emitter.client"
import { IMessageModel } from "../../database/models/Message"
import { v4, v5 } from "uuid"
import UTILS from "../../utils"

export const send = async (req: express.Request, res: express.Response) => { // Send a message to a channel
    const {message} = req.body
    const {channel_id} = req.params
    const token = req.token

    if (!channel_id || !token || !message || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH){ //type check
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    // Check if the user is banned

    // Check if the user is muted

    try {
        var User = await UTILS.FUNCTIONS.find.user.token(token) // Find the user
        if (!User) throw "User not found"
        
        // check length of message
        if (User.premium) {
            if (message.length > UTILS.CONSTANTS.MESSAGE.PROPERTIES.MAX_MESSAGE_LENGTH_PREMIUM || message.length < UTILS.CONSTANTS.MESSAGE.PROPERTIES.MIN_MESSAGE_LENGTH) throw "Message is too long or too short"
        }
        else {
            if (message.length > UTILS.CONSTANTS.MESSAGE.PROPERTIES.MAX_MESSAGE_LENGTH || message.length < UTILS.CONSTANTS.MESSAGE.PROPERTIES.MIN_MESSAGE_LENGTH) throw "Message is too long or too short"
        }

        var Channel = await DB.channels.find.id(parseInt(channel_id))
        if(!Channel) throw "Channel not found"

        // check if channel is a text channel
        if (Channel.channel_type == UTILS.CONSTANTS.CHANNEL.TYPE.VOICE) throw "Channel is not a text channel"

        // Check if the user has permission to send messages
        if (!UTILS.FUNCTIONS.PERMISSIONS.checkChannelPermissions(User, Channel, UTILS.CONSTANTS.CHANNEL.PERMISSIONS.MESSAGE.SEND)) throw "You do not have permission to send messages in this channel"

        Logger.debug(`Sending message to channel ${Channel}`)

        // Check if the user is in the channel
        if (!Channel.members.includes(User.user_id)) throw "You are not in this channel"

        var Message: IMessageModel = await DB.messages.create({ // Create the message
            message_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_id: parseInt(channel_id),
            user_id: User.user_id,
            message,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
        })
        await Message.save() // Save the message to the database

        Emitter.emit("sendMessage", Message) // Emit the message to the client
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Message sent`)
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