import express from "express"
import DB from "../../../database"
import { RouteResponse, Status } from "../../controller"
import UTILS from "../../../utils"

export const getFriendsRequestsSent = async (req: express.Request, res: express.Response) => { // Get a user
    try {
        const token = req.token

        // if token badly formatted
        if(!token || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        // fetch the user's info from the database
        User.friends_requests_sent = await DB.users.find.many(User.friends_requests_sent)

        for (let i = 0; i < User.friends_requests_sent.length; i++) {
            User.friends_requests_sent[i] = UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(User.friends_requests_sent[i])
        }

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`User found`)
                .setData(User.friends_requests_sent)
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