import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const remove = async (req: express.Request, res: express.Response) => { // kick a member from a channel
    const { user_id, member_id } = req.body
    const { channel_id } = req.params
    const token = req.token

    if (!channel_id || !token || !user_id || !member_id || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || user_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || user_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH || 
        member_id.length !== UTILS.CONSTANTS.USER.ID.MIN_LENGTH || member_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH) {
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        var Channel = await DB.channels.find.id(parseInt(channel_id))
        if(!Channel) throw "Channel not found"

        var Member = await DB.users.find.id(member_id)
        if(!Member) throw "Member not found"

        if (Channel.members.indexOf(member_id) === -1) throw "Error with the provided id"

        if (Channel.members.indexOf(user_id) === -1) throw "Error with the provided id"

        if (Channel.members.indexOf(user_id) !== 0) throw "You are not the owner of this channel"
    
        Channel.members.splice(Channel.members.indexOf(member_id), 1)
        await Channel.save()

        //update the member 

        Emitter.emit("channel_kick", {
            channel_id: channel_id,
            member_id: member_id,
            user_id: user_id
        })

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Member kicked")
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