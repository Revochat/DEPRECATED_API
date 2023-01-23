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
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH ||
        channel_name.length >= UTILS.CONSTANTS.CHANNEL.NAME.MAX_LENGTH || channel_name.length < UTILS.CONSTANTS.CHANNEL.NAME.MIN_LENGTH) { //type check
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found" // Check if the user exists
        var Channel = await DB.channels.find.id(parseInt(channel_id)) // Find the channel
        if(!Channel) throw "Channel not found" // Check if the channel exists

        // check for permissions here (if the user has permission to update the channel)
        if (UTILS.FUNCTIONS.permissions.hasChannelPermission(User, Channel, [UTILS.CONSTANTS.CHANNEL.PERMISSIONS.MANAGE.name]) === false) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("You do not have permission to update this channel")
            )
            return
        }

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
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}