import express from "express"
import { RouteResponse, Status } from "../../controller"
import Logger from "../../../client/logger.client"
import DB from "../../../database"


export const getMembers = async (req: express.Request, res: express.Response) => { // Get the members of a channel
    const {channel_id, token} = req.params

    if (!channel_id || !token || channel_id.length !== 13 || token.length !== 45){ //type check
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

        Logger.debug(`Getting members of channel ${Channel}`)
        res.json(
            new RouteResponse()

                .setStatus(Status.success)
                .setMessage(`Channel members`)
                .setData(Channel.members)
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