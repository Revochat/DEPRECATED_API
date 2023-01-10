import express from "express"
import { RouteResponse, Status } from "../../controller"
import DB from "../../../database"
import Emitter from "../../../client/emitter.client"

export const kick = async (req: express.Request, res: express.Response) => { // Kick a user from a channel
    const {channel_id, user_id, token} = req.body
    try {
        var User = await DB.users.find.token(token) // Find the user
        if(!User) throw "User not found" // Check if the user exists
        var Channel = await DB.channels.find.id(channel_id) // Find the channel
        if(!Channel) throw "Channel not found" // Check if the channel exists
        if (User.user_id !== Channel.owner_id) throw "You are not the owner of this channel" // Check if the user is the owner of the channel

        // Remove the user from the channel
        Channel.members = Channel.members.filter((member) => member !== user_id) // Remove the user from the channel
        Channel.members_count = Channel.members.length // Update the members count
        await Channel.save()
        Emitter.emit("kickChannel", Channel)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`User kicked`)
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