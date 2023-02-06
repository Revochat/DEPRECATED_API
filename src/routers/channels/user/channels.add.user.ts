import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const join = async (req: express.Request, res: express.Response) => { // Add a user to a channel
    const {channel_id, user_id} = req.params
    const token = req.token

    if (!channel_id || !token || !user_id || channel_id.length < UTILS.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > UTILS.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH 
        || user_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || user_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH) { //type check
            
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var Channel = await DB.channels.find.id(parseInt(channel_id)) // Find the channel
        if(!Channel) throw "Channel not found" // Check if the channel exists

        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found" // Check if the user exists

        if (Channel.server_id) throw "This is not a dm or group channel"
        
        if (User.user_id !== Channel.owner_id) throw "You are not the owner of this channel" // Check if the user is the owner of the channel

        var UserToAdd = await DB.users.find.id(parseInt(user_id)) // Find the user to add
        if(!UserToAdd) throw "User to add not found" // Check if the user to add exists

        if (Channel.members.includes(UserToAdd.user_id)) throw "User is already in this channel" // Check if the user is already in the channel

        // Check if the user has permission to update the channel 
        if (!UTILS.FUNCTIONS.PERMISSIONS.checkChannelPermissions(User, Channel, UTILS.CONSTANTS.CHANNEL.PERMISSIONS.MEMBER.INVITE)) throw "You do not have permission to update this channel"

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