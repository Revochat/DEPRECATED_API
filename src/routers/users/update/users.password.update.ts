import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import bcrypt from "bcrypt"
import UTILS from "../../../utils"
import { v4, v5 } from "uuid"

export const passwordUpdate = async (req: express.Request, res: express.Response) => { // Update the password
    try {
        const { newpassword } = req.body
        const token = req.token

        // if token or newpassword badly formatted
        if(!token || !newpassword || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || 
            newpassword.length >= UTILS.CONSTANTS.USER.PASSWORD.MAX_LENGTH || newpassword.length <= UTILS.CONSTANTS.USER.PASSWORD.MIN_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        User.token = (v5(User.username + Date.now(), v4()).split("-").join("") + Date.now()).toUpperCase() // generate a new token
        User.password = await bcrypt.hash(newpassword, 10)
        User.updated_at = new Date().toLocaleString()
        await User.save()

        Emitter.emit("updatePassword", User)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Password updated`)
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
