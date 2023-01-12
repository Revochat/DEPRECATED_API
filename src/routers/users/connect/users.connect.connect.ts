import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import bcrypt from "bcrypt"
import { v4, v5 } from "uuid"
import Controller from "../../controller/router.controller"
import UTILS from "../../../utils"

export const userConnect = async (req: express.Request, res: express.Response) => { // Connect a user
    try {
        const { token } = req.body

        // if username or password badly formatted
       if(token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH|| token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "Token invalid"
        Emitter.emit("connect", User, null)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Successfully connect to the user ${User.username}`)
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