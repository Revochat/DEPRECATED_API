import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const updatePermissions = async (req: express.Request, res: express.Response) => { // Update a channel
    const {permissions} = req.body
    const {channel_id} = req.params
    const token = req.token

    if (!channel_id || !token || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ) { //type check
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

        // check the integrity of permissions
        // if (!UTILS.FUNCTIONS.PERMISSIONS.checkIntegrity(permissions)) throw "Badly formatted permissions"

        if (Channel.server_id) { // If the channel is a server channel = no permissions editing in private channels
            if (!UTILS.FUNCTIONS.PERMISSIONS.checkChannelPermissions(User, Channel, UTILS.CONSTANTS.CHANNEL.PERMISSIONS.ADMIN)) throw "You do not have permission to update this channel"
        }

        Channel.permissions = permissions // Update the channel permissions
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