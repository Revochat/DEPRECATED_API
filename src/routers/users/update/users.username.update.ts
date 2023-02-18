import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"
import { IUser } from '../../../database/models/User';

export const usernameUpdate = async (req: express.Request, res: express.Response) => { // Update the username
    try {
        const { newusername } = req.params
        const token = req.token

        // if token or newusername badly formatted
        if(!token || !newusername || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            newusername.length >= UTILS.CONSTANTS.USER.USERNAME.MAX_LENGTH || newusername.length < UTILS.CONSTANTS.USER.USERNAME.MIN_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"
        
        if (User.username == newusername) throw "Username is the same"

        User.username = newusername
        User.updated_at = new Date().toLocaleString()
        await User.save()

        Emitter.emit("updateUsername", User)
        
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Username updated`)
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