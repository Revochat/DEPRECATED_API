import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const leave = async (req: express.Request, res: express.Response) => { // Leave a channel
    const {channel_id, token} = req.params

    if (!channel_id || !token || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH){ //type check
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

        // Check if the user is in the channel
        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        if (!Channel.members.includes(User.user_id)) throw "You are not in this channel"

        // Remove the user from the channel
        Channel.members = Channel.members.filter((member) => member !== User.user_id)
        Channel.members_count = Channel.members.length
        await Channel.save()

        Logger.debug(`User ${User.user_id} has left channel ${Channel}`)
        Emitter.emit("leaveChannel", Channel)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channel left`)
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