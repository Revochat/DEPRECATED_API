import express from "express"
import { RouteResponse, Status } from "../../controller"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"
import { Types, Document } from "mongoose"
import { IMessageModel } from "../../../database/models/Message"

export const getMessages = async (req: express.Request, res: express.Response) => { // Get the x number of last messages of a channel
    try {
        const {channel_id, limit} = req.params
        const token = req.token
    
        if (!token || !channel_id || !limit || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH || 
            token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            limit.length > UTILS.CONSTANTS.SERVER.MESSAGE.MAX_FETCH_LIMIT || limit.length < UTILS.CONSTANTS.SERVER.MESSAGE.MIN_FETCH_LIMIT || isNaN(parseInt(channel_id))) throw "Badly formatted"

        var User = await UTILS.FUNCTIONS.FIND.USER.token(token)
        if (!User) throw "User not found"

        var Channel = await DB.channels.find.id(parseInt(channel_id))
        if(!Channel) throw "Channel not found"

        if (!Channel.members.includes(User.user_id)) throw "You are not a member of this channel"

        var Messages = await DB.channels.find.messages(channel_id, parseInt(limit))
        if (!Messages) throw "Messages not found"

        // fetch user's info
        var Authors = await DB.users.find.many(Messages.map(message => message.user_id))
        if (!Authors) throw "Authors not found"

        var BuiltMessages: any = []
        // replace user_id with user object
        for (var message of Messages) {
            var Author = Authors.find(author => author.user_id == message.user_id)
            if (!Author) throw "Author not found"
            BuiltMessages.push({message, author: UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(Author)})
        }

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channel messages`)
                .setData(BuiltMessages)
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