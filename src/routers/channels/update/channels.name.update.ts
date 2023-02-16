import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const updateName = async (req: express.Request, res: express.Response) => { // Update a channel
    const {channel_name} = req.body
    const {channel_id} = req.params
    const token = req.token

    if (!channel_id || !token || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
        channel_name.length >= UTILS.CONSTANTS.CHANNEL.NAME.MAX_LENGTH || channel_name.length < UTILS.CONSTANTS.CHANNEL.NAME.MIN_LENGTH) throw "Badly formatted"

    try {
        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found" // Check if the user exists
        var Channel = await DB.channels.find.id(parseInt(channel_id)) // Find the channel
        if(!Channel) throw "Channel not found" // Check if the channel exists

        // Check if the user has permission to update the channel 
        if (!UTILS.FUNCTIONS.CHECK.CHANNEL.PERMISSIONS(User, Channel, UTILS.CONSTANTS.CHANNEL.PERMISSIONS.ADMIN)) throw "You do not have permission to update this channel"

        Channel.channel_name = channel_name // Update the channel name
        Channel.updated_at = Date.toLocaleString()
        await Channel.save() // Save the channel
        Logger.debug(`Channel ${Channel} has been updated`)
        Emitter.emit("updateChannel", Channel)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channel updated`)
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