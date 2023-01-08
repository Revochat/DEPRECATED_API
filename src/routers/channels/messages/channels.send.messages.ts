import express from "express"
import { RouteResponse, Status } from "../../controller"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import Emitter from "../../../client/emitter.client"
import { IMessageModel } from "../../../database/models/Message"
import { v4, v5 } from "uuid"

export const sendMessage = async (req: express.Request, res: express.Response) => { // Send a message to a channel
    const {channel_id, user_id, message} = req.body

    if (!channel_id || !user_id || !message || channel_id.length !== 13 || user_id.length !== 13 || message.length > 1000){ //type check
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
        Logger.debug(`Sending message to channel ${Channel}`)

        // Check if the user is in the channel
        if (!Channel.members.includes(user_id)) throw "You are not in this channel"

        var Message: IMessageModel = await DB.messages.create({ // Create the message
            message_id: parseInt((v5(message, v4()).split("-").join("") + Date.now()).toUpperCase()),
            channel_id,
            user_id,
            message,
            created_at: Date.toLocaleString(),
            updated_at: Date.toLocaleString()
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