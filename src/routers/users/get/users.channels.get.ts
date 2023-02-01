import express from "express"
import DB from "../../../database"
import { RouteResponse, Status } from "../../controller"
import UTILS from "../../../utils"
import Logger from "../../../client/logger.client"

export const getChannels = async (req: express.Request, res: express.Response) => { // Get a user
    try {
        const token = req.token
        Logger.log("Getting user channels")

        // if token badly formatted
        if(!token || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        // fetch the user's channels from the database
        const channels = await DB.users.find.channels(User.user_id)

        for (let i = 0; i < channels.length; i++) {
            channels[i] = UTILS.FUNCTIONS.REMOVE_OVERFLOW_INFO_CHANNEL(channels[i])
        }

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`User channels found`)
                .setData(channels)
        )
    }
    catch(err) {
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}