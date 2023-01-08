import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"

export const walletUpdate = async (req: express.Request, res: express.Response) => { // Update the wallet token
    try {
        const { token, newwallet_token } = req.params
        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"
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