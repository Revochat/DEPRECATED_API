import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"

export const remove = async (req: express.Request, res: express.Response) => { // Delete a channel
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
        var Channel = await DB.channels.find.id(channel_id) // Find the channel
        if(!Channel) throw "Channel not found"

        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found"

        console.log(User.user_id, Channel.owner_id)
        if (User.user_id !== Channel.owner_id) throw "You are not the owner of this channel" // Check if the user is the owner of the channel
        await Channel.delete()

        // remove the channel from the members 
        for (let i = 0; i < Channel.members.length; i++) {
            const member_id = Channel.members[i];
            var Member = await DB.users.find.id(member_id)
            if(!Member) throw "Member not found"
            var channel_id_temp = Channel.channel_id // temp variable to prevent error
            console.log(channel_id_temp)
            if (Member.channels && Channel) {
                Member.channels = Member.channels.filter((channel) => channel !== channel_id_temp)
            }

            await Member.save()
        }

        Logger.debug(`Channel ${Channel} has been deleted`)
        Emitter.emit("deleteChannel", Channel)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channel deleted`)
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