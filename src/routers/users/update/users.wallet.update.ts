import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"

export const walletUpdate = async (req: express.Request, res: express.Response) => { // Update the wallet token
    try {
        const { newwallet_token } = req.body
        const token = req.token

        if (!token || typeof token !== "string" || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH || 
            !newwallet_token || typeof newwallet_token !== "string") throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        User.wallet_token = newwallet_token
        User.updated_at = new Date().toLocaleString()
        await User.save()

        Emitter.emit("updateWalletToken", User)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Wallet token updated`)
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