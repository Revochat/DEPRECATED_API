import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const removeChannel = async (req: express.Request, res: express.Response) => { // Delete a channel
    const {channel_id} = req.params
    const token = req.token

    if (!channel_id || !token || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ) throw "Badly formatted"

    try {
        var Channel = await DB.channels.find.id(parseInt(channel_id)) // Find the channel
        if(!Channel) throw "Channel not found"

        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found"

        if (User.user_id !== Channel.owner_id) throw "You are not the owner of this channel" // Check if the user is the owner of the channel

        // check if the user has permission to update the channel
        if (!Channel.server_id) throw "Channel is not a server channel" // only server channels can be deleted
        
        if (!UTILS.FUNCTIONS.CHECK.CHANNEL.PERMISSIONS(User, Channel, UTILS.CONSTANTS.CHANNEL.PERMISSIONS.ADMIN)) throw "You do not have permission to delete this channel"

        await Channel.delete() // delete the channel

        // remove the channel from the members 
        for (let i = 0; i < Channel.members.length; i++) {
            const member_id = Channel.members[i];
            var Member = await DB.users.find.id(member_id)
            if(!Member) throw "Member not found"
            var channel_id_temp = Channel.channel_id // temp variable to prevent error
            if (Member.channels && Channel) {
                Member.channels = Member.channels.filter((channel) => channel !== channel_id_temp)
            }
            await Member.save()
        }

        Emitter.emit("deleteChannel", Channel)
        
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channel deleted`)
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