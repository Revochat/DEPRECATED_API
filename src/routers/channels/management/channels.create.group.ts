import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const create_group = async (req: express.Request, res: express.Response) => { // Create a private channel
    const { user_id, friend_id_1, friend_id_2 } = req.body
    const { token } = req.params

    if (token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH ||
        user_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || user_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH ||
        friend_id_1.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || friend_id_1.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH ||
        friend_id_2.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || friend_id_2.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH) {

        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var User = await UTILS.FUNCTIONS.find.user(token)
        var Friend_1 = await UTILS.FUNCTIONS.find.user(friend_id_1)
        var Friend_2 = await UTILS.FUNCTIONS.find.user(friend_id_2)

        Logger.log("Creating private channel between " + User.username + " and " + Friend_1.username + " and " + Friend_2.username)

        if (User.channels.length >= UTILS.CONSTANTS.CHANNEL.MAX_PRIVATE_CHANNELS) throw "You have reached the maximum number of private channels"

        var Channel = await DB.channels.create({
            channel_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_type: UTILS.CONSTANTS.CHANNEL.TYPE.PRIVATE,
            channel_name: User.username + " and " + Friend_1.username,
            updated_at: new Date().toString(),
            created_at: new Date().toString(),
            members: [User.user_id, Friend_1.user_id, Friend_2.user_id],
            members_count: 3,
            owner_id: User.user_id,
            
            permissions: UTILS.CONSTANTS.PERMISSIONS.GROUP(User, Friend_1, Friend_2)
        })

        User.channels.push(Channel.channel_id) // save the channel id to the user
        Friend_1.channels.push(Channel.channel_id)
        Friend_2.channels.push(Channel.channel_id)

        await User.save() // Save the user
        await Friend_1.save()
        await Friend_2.save()

        Emitter.emit("channel.create", Channel) // Emit the event to the client
        Emitter.emit("channel.join", Channel, User)
        Emitter.emit("channel.join", Channel, Friend_1)
        Emitter.emit("channel.join", Channel, Friend_2)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Channel created")
                .setData(Channel)
        )
    }
    catch (err) {
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
        return
    }
}
