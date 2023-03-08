import express from "express"
import { RouteResponse, Status } from "../../controller"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const getMembers = async (req: express.Request, res: express.Response) => { // Get the members of a channel
    const {channel_id} = req.params
    const token = req.token

    if (!channel_id || !token || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || isNaN(parseInt(channel_id))) throw "Badly formatted"

    try {
        var Channel = await DB.channels.find.id(parseInt(channel_id))
        if(!Channel) throw "Channel not found"

        // Check if the user is in the channel
        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        if (!Channel.members.includes(User.user_id)) throw "You are not in this channel"

        Logger.debug(`Getting members of channel ${Channel}`)

        // fetch the members of the channel
        var Members = await DB.users.find.many(Channel.members)

        if(!Members) throw "Members not found"

        // Remove private info
        const Members_Public_Info = Members.map((member: any) => UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(member))

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channel members`)
                .setData(Members_Public_Info)
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