import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import { IUserModel } from "../../../database/models/User"
import { Types } from "mongoose"
import bcrypt from "bcrypt"
import { v4, v5 } from "uuid"
import Controller from "../../controller/router.controller"
import UTILS from "../../../utils"

export const userRegister = async (req: express.Request, res: express.Response) => { // Register a new user
    try {
        Logger.debug(req.body)
        const { username, password } = req.body

        // if username or password badly formatted
        if(!username || !password || username.length >= UTILS.CONSTANTS.USER.USERNAME.MAX_LENGTH || username.length <= UTILS.CONSTANTS.USER.USERNAME.MIN_LENGTH||password.length >= UTILS.CONSTANTS.USER.PASSWORD.MAX_LENGTH || password.length <= UTILS.CONSTANTS.USER.PASSWORD.MIN_LENGTH) throw "Badly formatted"

        var user = await DB.users.find.username(username)
        if (user) throw "User already exists"

        var User: IUserModel & {_id: Types.ObjectId} = await DB.users.create({
            username: username,
            password: await bcrypt.hash(password, 10),
            premium_expiration: new Date().toLocaleString(),
            token: (v5(username, v4()).split("-").join("") + Date.now()).toUpperCase(),
            user_id: Date.now() + Math.floor(Math.random() * 1000),
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
        })

        // create a channel where there only is the user
        var Channel = await DB.channels.create({
            channel_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_type: UTILS.CONSTANTS.CHANNEL.TYPE.HYBRID,
            channel_name: "Me",
            updated_at: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
            // add the user to the channel members
            members: [User.user_id],
            members_count: 1,
            
            permissions: UTILS.CONSTANTS.PERMISSIONS.SOLO(User)
        })

        User.channels = [Channel.channel_id]
        User.save()

        Logger.success(`User ${username} has been registered`)
        Emitter.emit("register", User)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Successfully register")
                .setData(User)
        )

    }
    catch (err) {
        Logger.debug(req.body)
        res.status(400)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}