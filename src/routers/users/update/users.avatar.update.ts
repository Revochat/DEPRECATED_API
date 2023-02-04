import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"

export const avatarUpdate = async (req: express.Request, res: express.Response) => { // Update the profile picture
    const { newavatar } = req.body
    const token = req.token

    // if token or newavatar badly formatted
    if(!token || !newavatar || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH ||
        !UTILS.CONSTANTS.USER.PROFILE_PICTURE) throw "Badly formatted"
    
    // if user not found
    var User = await DB.users.find.token(token)
    if(!User) throw "User not found"
    
    Logger.debug(`User ${User.username} has updated his avatar`)
    
}