import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import UTILS from "../../../utils"

export const avatarUpdate = async (req: express.Request, res: express.Response) => { // Update the profile picture
    const { newavatar } = req.body
    const token = req.token
    
}