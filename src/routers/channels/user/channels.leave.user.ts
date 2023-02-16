import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const leave = async (req: express.Request, res: express.Response) => { // Leave a channel
    const {channel_id} = req.params
    const token = req.token

    if (!channel_id || !token || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH) throw "Badly formatted"

    try {
        // Check if the channel exists
        var Channel = await DB.channels.find.id(parseInt(channel_id))
        if(!Channel) throw "Channel not found"

        // Check if the user is in the channel
        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        if (!Channel.members.includes(User.user_id)) throw "You are not in this channel"

        if (Channel.server_id) throw "You cannot leave a server channel"

        // Remove the user from the channel
        Channel.members = Channel.members.filter((member) => member !== User.user_id)
        Channel.members_count = Channel.members.length
        await Channel.save()

        Emitter.emit("leaveChannel", Channel)
        
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channel left`)
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