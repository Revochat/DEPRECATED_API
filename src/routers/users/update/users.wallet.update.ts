import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"

export const walletUpdate = async (req: express.Request, res: express.Response) => { // Update the wallet token
    try {
        const { token, newwallet_token } = req.params

        // type check token
        if (!token || typeof token !== "string" || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"
        
        if (!newwallet_token || newwallet_token.length != User.wallet_token.length) throw "Badly formatted"

        User.wallet_token = newwallet_token
        User.updated_at = new Date().toLocaleString()
        User.save()
        Logger.debug(`User ${User} has been updated`)
        Emitter.emit("updateWalletToken", User)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Wallet token updated`)
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