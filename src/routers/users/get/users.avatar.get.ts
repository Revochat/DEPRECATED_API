import express from "express"
import DB from "../../../database"
import { RouteResponse, Status } from "../../controller"
import UTILS from "../../../utils"

export const getAvatar = async (req: express.Request, res: express.Response) => { // Get a user avatar
    try {
        const {user_id} = req.params

        // if user_id badly formatted
        if(!user_id || user_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || user_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH || isNaN(parseInt(user_id))) throw "Badly formatted"

        var User = await DB.users.find.id(parseInt(user_id))
        if(!User) throw "User not found"

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`User found`)
                .setData(User.avatar)
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