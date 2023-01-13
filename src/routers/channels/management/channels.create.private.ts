import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const create_private = async (req: express.Request, res: express.Response) => { // Create a private channel
    const { user_id } = req.body
    const { friend_id, token } = req.params

    if (token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH ||
        user_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || user_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH ||
        friend_id.length !== UTILS.CONSTANTS.USER.ID.MIN_LENGTH || friend_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH) {

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

        var Friend = await DB.users.find.id(parseInt(friend_id))
        if(!Friend) throw "Friend not found"

        Logger.log("Creating private channel between " + User.username + " and " + Friend.username)

        if (User.channels.length >= UTILS.CONSTANTS.CHANNEL.MAX_PRIVATE_CHANNELS) throw "You have reached the maximum number of private channels"

        // create channel
        var Channel = await DB.channels.create({
            channel_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_type: 0, // voice and text channel
            channel_name: "Private Channel",
            members: [user_id, friend_id],
            members_count: 2,
            updated_at: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
            permissions: {
                manage: { roles_id: {0: false}, user_id: {}},
                view: { roles_id: {0: true}, user_id: {}},
                member: {
                    invite: { roles_id: {0: false}, user_id: {}},
                    remove: { roles_id: {0: false}, user_id: {}},
                },
                messages: {
                    send: { roles_id: {0: true}, user_id: {}},
                    delete: { roles_id: {0: false}, user_id: {}},
                    mentions: { roles_id: {0: true}, user_id: {}},
                    send_file: { roles_id: {0: true}, user_id: {}},
                }
            }
        })
        await Channel.save()
        
        // add channel to user
        User.channels.push(Channel.channel_id)
        await User.save()

        // add channel to friend
        if (Friend.channels) Friend.channels.push(Channel.channel_id)
        else Friend.channels = [Channel.channel_id]
        await Friend.save()

        Logger.log("Created private channel between " + User.username + " and " + Friend.username)

        // send channel to user and friend
        Emitter.emit("channelCreatePrivate", {
            user_id: user_id,
            friend_id: friend_id,
            channel: Channel
        })

        Logger.log("Sent private channel between " + User.username + " and " + Friend.username)
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
