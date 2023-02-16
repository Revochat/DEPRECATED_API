import express from "express"
import DB from "../../../database"
import { RouteResponse, Status } from "../../controller"
import UTILS from "../../../utils"

export const getBlocked = async (req: express.Request, res: express.Response) => { // Get a user
    try {
        const token = req.token

        // if token badly formatted
        if(!token || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        // fetch blocked users from the database
        User.blocked = await DB.users.find.many(User.blocked)

        for (let i = 0; i < User.blocked.length; i++) {
            User.blocked[i] = UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(User.blocked[i])
        }

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`User found`)
                .setData(User.blocked)
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