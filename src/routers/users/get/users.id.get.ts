import express from "express"
import DB from "../../../database"
import { RouteResponse, Status } from "../../controller"
import UTILS from "../../../utils"

export const getUserbyID = async (req: express.Request, res: express.Response) => { // Get a user
    try {
        const {user_id} = req.params

        // if user_id badly formatted
        if(!user_id || user_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || user_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.id(parseInt(user_id))
        if(!User) throw "User not found"

        User = UTILS.FUNCTIONS.removeSensitiveData(User)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`User found`)
                .setData(User)
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