import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const create_server = async (req: express.Request, res: express.Response) => {
    const { channel_name, channel_type} = req.body
    const {server_id} = req.params
    const token = req.token

    if (!token || !server_id || !channel_name || !channel_type ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
        server_id.length !== UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH ||
        channel_name.length < UTILS.CONSTANTS.CHANNEL.NAME.MIN_LENGTH || channel_name.length > UTILS.CONSTANTS.CHANNEL.NAME.MAX_LENGTH ||
        channel_type == UTILS.CONSTANTS.CHANNEL.TYPE.TEXT || channel_type == UTILS.CONSTANTS.CHANNEL.TYPE.VOICE) {

        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var User = await UTILS.FUNCTIONS.find.user.token(token)
        var Server = await UTILS.FUNCTIONS.find.server.id(parseInt(server_id))

        Logger.log("Creating server channel for " + User.username + " in " + channel_name)

        if (User.channels.length >= UTILS.CONSTANTS.CHANNEL.MAX_SERVER_CHANNELS) throw "You have reached the maximum number of server channels"

        // create channel
        var Channel = await DB.channels.create({
            server_id: parseInt(server_id),
            channel_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_type: channel_type,
            channel_name: channel_name,
            updated_at: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
            members: [User.user_id],
            members_count: 1,
            
            permissions: UTILS.CONSTANTS.PERMISSIONS.SERVER(User)
        })

        await Channel.save()

        // add channel to server
        if (Server.channels) Server.channels.push(Channel.channel_id)
        else Server.channels = [Channel.channel_id]
        await Server.save()

        Logger.log("Created server channel for " + User.username + " in " + Server.server_name)

        // send event to client to update channels list in sidebar
        Emitter.emit("update_channels", {
            server_id: Server.server_id,
            channels: Server.channels
        })

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Channel created")
                .setData(Channel)
        )
    } catch (error) {
        Logger.error(error)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Could not create channel")
        )
    }
}