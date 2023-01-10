import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"
export const create = async (req: express.Request, res: express.Response) => { // Create a channel
    const { server_id, user_id, channel_type } = req.body
    const { channel_name, token } = req.params

    if (!channel_name || !token || !user_id || channel_name.length >= UTILS.CONSTANTS.CHANNEL.NAME.MAX_NAME_LENGTH || channel_name.length <= UTILS.CONSTANTS.CHANNEL.NAME.MIN_NAME_LENGTH ||
        token.length !== UTILS.CONSTANTS.USER.TOKEN.DEFAULT_TOKEN_LENGTH || user_id.length !== UTILS.CONSTANTS.USER.ID.DEFAULT_LENGTH || channel_type !== "text" || channel_type !== "voice" ||
        ((server_id && server_id.length !== UTILS.CONSTANTS.SERVER.SERVER.DEFAULT_ID_LENGTH) || (!server_id && server_id !== undefined))) {
        
            res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        if (server_id) { // If the channel is a server channel
            var Server = await DB.servers.find.id(server_id)
            if(!Server) throw "Server not found"
            if (!Server.members.includes(user_id)) throw "You are not a member of this server"

            // permissions check TODO

            var Channel = await DB.channels.create({
                channel_id: Date.now() + Math.floor(Math.random() * 1000),
                channel_name: channel_name,
                channel_type: channel_type,
                owner_id: user_id,
                server_id: server_id,
                members: [user_id],
                members_count: 1,
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString()
            })
        } else { // If the channel is a DM channel

            console.log("Creating DM channel")
            var Channel = await DB.channels.create({
                channel_id: Date.now() + Math.floor(Math.random() * 1000),
                channel_name: channel_name,
                channel_type: channel_type,
                owner_id: user_id,
                members: [user_id],
                members_count: 1,
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString()
            })
        }

        await Channel.save()

        // Add the channel to the user
        User.channels.push(Channel.channel_id)
        await User.save()

        Logger.debug(`Channel ${Channel} has been created`)
        Emitter.emit("createChannel", Channel)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`Channel created`)
                .setData(Channel)
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