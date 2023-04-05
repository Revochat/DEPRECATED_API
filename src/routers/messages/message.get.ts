import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import UTILS from "../../utils"
import DB from "../../database"

export const get = async (req: express.Request, res: express.Response) => {
    try {
        const {message_id} = req.params
        const token = req.token

        if (!message_id || !token || !token ||
            message_id.length  < UTILS.CONSTANTS.MESSAGE.ID.MIN_LENGTH || message_id.length > UTILS.CONSTANTS.MESSAGE.ID.MAX_LENGTH ||
            token.length < UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || isNaN(parseInt(message_id))) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        var Message = await DB.messages.find.id(message_id)
        if (!Message) throw "Message not found"

        //fetch channel 
        var Channel = await DB.channels.find.id(Message.channel_id)
        if (!Channel) throw "Channel not found"

        // check if user is in the channel
        if (!User.channels.includes(Channel.channel_id)) throw "User is not in the channel"

        // fetch user's info
        var Author = await DB.users.find.id(Message.user_id)
        if (!Author) throw "Author not found"

        Emitter.emit("getMessage", Message)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Message found`)
                .setData(Object.assign(Message, Author))
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