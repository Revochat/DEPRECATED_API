import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const create_group = async (req: express.Request, res: express.Response) => { // Create a private channel
    try {
        const { friend_id_1, friend_id_2 } = req.params
        const token = req.token
    
        if (!token || !friend_id_1 || !friend_id_2 ||
            token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            friend_id_1.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || friend_id_1.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH ||
            friend_id_2.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || friend_id_2.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH || isNaN(parseInt(friend_id_1)) || isNaN(parseInt(friend_id_2))) throw "Badly formatted"
    
        var User = await UTILS.FUNCTIONS.FIND.USER.token(token)
        var Friend_1 = await UTILS.FUNCTIONS.FIND.USER.id(parseInt(friend_id_1))
        var Friend_2 = await UTILS.FUNCTIONS.FIND.USER.id(parseInt(friend_id_2))

        if (User.channels.length >= UTILS.CONSTANTS.CHANNEL.MAX_PRIVATE_CHANNELS) throw "You have reached the maximum number of private channels"

        var Channel = await DB.channels.create({
            channel_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_type: UTILS.CONSTANTS.CHANNEL.TYPE.HYBRID,
            channel_name: User.username + " and " + Friend_1.username + " and " + Friend_2.username,
            updated_at: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
            channel_category: "GROUP",
            members: [User.user_id, Friend_1.user_id, Friend_2.user_id],
            members_count: 3,
            owner_id: User.user_id,
            
            permissions: UTILS.CONSTANTS.PERMISSIONS.GROUP(User, Friend_1, Friend_2)
        })

        if(!Channel) throw "Failed to create channel"

        User.channels.push(Channel.channel_id) // save the channel id to the user
        await User.save() // Save the user

        if (!Friend_1.channels) Friend_1.channels = [] // this should never happen but typesafe..
        Friend_1.channels.push(Channel.channel_id)
        await Friend_1.save()

        if (!Friend_2.channels) Friend_2.channels = []
        Friend_2.channels.push(Channel.channel_id)
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
        res.status(400)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
        return
    }
}
