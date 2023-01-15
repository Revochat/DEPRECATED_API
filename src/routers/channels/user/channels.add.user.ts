import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"

export const add = async (req: express.Request, res: express.Response) => { // Add a user to a channel
    const {channel_id, token, user_id} = req.params

    if (!channel_id || !token || !user_id || channel_id.length !== 13 || token.length !== 45 || user_id.length !== 13){ //type check
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var Channel = await DB.channels.find.id(channel_id) // Find the channel
        if(!Channel) throw "Channel not found" // Check if the channel exists

        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found" // Check if the user exists
        
        if (User.user_id !== Channel.owner_id) throw "You are not the owner of this channel" // Check if the user is the owner of the channel

        var UserToAdd = await DB.users.find.id(parseInt(user_id)) // Find the user to add
        if(!UserToAdd) throw "User to add not found" // Check if the user to add exists

        if (Channel.members.includes(UserToAdd.user_id)) throw "User is already in this channel" // Check if the user is already in the channel

        if (!Channel.members) Channel.members = [] // Check if the channel has members
        Channel.members.push(UserToAdd.user_id) // Add the user to the channel
        Channel.members_count = Channel.members.length
        Channel.updated_at = Date.toLocaleString()
        await Channel.save() // Save the channel

        if (!UserToAdd.channels) UserToAdd.channels = [] // Check if the user has channels
        UserToAdd.channels.push(Channel.channel_id) // Add the channel to the user
        await UserToAdd.save() // Save the user

        Logger.debug(`User ${UserToAdd} has been added to channel ${Channel}`)
        Emitter.emit("addUserToChannel", Channel, UserToAdd)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`User added to channel`)
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