import express from "express"
import DB from "../../../database"
import { RouteResponse, Status } from "../../controller"
import UTILS from "../../../utils"

export const getUserbyID = async (req: express.Request, res: express.Response) => { // Get a user
    try {
        const {user_id} = req.params
        const token = req.token

        // if token or user_id badly formatted
        if(!token || !user_id || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || !UTILS.CONSTANTS.USER.ID) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(User) { // if user token is valid
            if(User.id == parseInt(user_id)) {
                res.status(200)
                res.json(
                    new RouteResponse()
                        .setStatus(Status.success)
                        .setMessage(`User found`)
                        .setData(User)
                )
                return
            }
        }
        throw "User not found"
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