import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"

export const channelsUpdate = async (req: express.Request, res: express.Response) => { // Update the channels of the user 
    try {
        const { newchannels } = req.body
        const token = req.token

        // if token or newchannels badly formatted
        if(!token || !newchannels || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            newchannels.length > UTILS.CONSTANTS.USER.CHANNELS.MAX_LENGTH || newchannels.length < UTILS.CONSTANTS.USER.CHANNELS.MIN_LENGTH) throw "Badly formatted"

        // if user not found
        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        // check if the channels are all in User.channels (if not the user could add a channel that he doesn't have access to)
        for(var i = 0; i < newchannels.length; i++) {
            if(!User.channels.includes(newchannels[i])) throw "Badly formatted"
        }

        User.channels = newchannels
        User.updated_at = new Date().toLocaleString()
        await User.save()

        Emitter.emit("updateChannels", User)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channels updated`)
                .setData(User)
        )
    }

    catch(err) {
        res.status(400)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}