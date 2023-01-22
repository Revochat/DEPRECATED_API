import express from "express"
import { RouteResponse, Status } from "../../controller"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const getPermissions = async (req: express.Request, res: express.Response) => { // Get a channel
    const {channel_id} = req.params
    const token = req.token

    if (!token || !channel_id || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH) { //type check
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        const User = await DB.users.find.token(token)
        if (!User) throw "User not found"

        const Channel = await DB.channels.find.id(parseInt(channel_id))
        if (!Channel) throw "Channel not found"

        // Check if user is in channel
        const UserInChannel = await DB.channels.find.userInChannel(User.id, Channel.id)
        if (!UserInChannel) throw "User not in channel"

        if (Channel.server_id) { // Check if user is in server if channel is part of a server
            const UserInServer = await DB.servers.find.userInServer(User.id, Channel.server_id)
            if (!UserInServer) throw "User not in server"
        }

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Channel found")
                .setData(Channel.permissions)
        )
    }

    catch (err) {
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}