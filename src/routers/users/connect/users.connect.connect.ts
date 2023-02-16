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
        const token = req.token

        // if username or password badly formatted
       if(!token || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH|| token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "Invalid token"

        User.last_connection = new Date().toLocaleString()
        User.save() //update the last connection date of the user in the database

        // fetch the user's friends info from the database
        User.friends = await DB.users.find.many(User.friends)
        for (let i = 0; i < User.friends.length; i++) {
            User.friends[i] = UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(User.friends[i])
        }

        User.friends_requests_sent = await DB.users.find.many(User.friends_requests_sent)
        for (let i = 0; i < User.friends_requests_sent.length; i++) {
            User.friends_requests_sent[i] = UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(User.friends_requests_sent[i])
        }

        User.friends_requests_received = await DB.users.find.many(User.friends_requests_received)
        for (let i = 0; i < User.friends_requests_received.length; i++) {
            User.friends_requests_received[i] = UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(User.friends_requests_received[i])
        }

        User.channels = await DB.channels.find.many(User.channels)
        for (let i = 0; i < User.channels.length; i++) {
            User.channels[i] = User.channels[i]
        }
        
            
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