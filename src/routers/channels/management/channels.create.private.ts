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
        var User = UTILS.FUNCTIONS.findUser(token)
        var Friend = UTILS.FUNCTIONS.findUser(friend_id)

        Logger.log("Creating private channel between " + User.username + " and " + Friend.username)

        if (User.channels.length >= UTILS.CONSTANTS.CHANNEL.MAX_PRIVATE_CHANNELS) throw "You have reached the maximum number of private channels"

        // create channel
        var Channel = await DB.channels.create({
            channel_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_type: UTILS.CONSTANTS.CHANNEL.TYPE.PRIVATE,
            channel_name: User.username + " and " + Friend.username,
            updated_at: new Date().toString(),
            created_at: new Date().toString(),
            members: [User.user_id, Friend.user_id],
            members_count: 2,

            permissions: {
                manage: {
                    user_id: [],
                    roles_id: []
                },
                view: {
                    user_id: [User.user_id, Friend.user_id],
                    roles_id: []
                },
                message: {

                    send: {
                        user_id: [User.user_id, Friend.user_id],
                        roles_id: []
                    },
                    send_files: {
                        user_id: [User.user_id, Friend.user_id],
                        roles_id: []
                    },
                    mentions: {
                        user_id: [User.user_id, Friend.user_id],
                        roles_id: []
                    }
                },
                member: {
                    invite: {
                        user_id: [],
                        roles_id: []
                    },
                    remove: {
                        user_id: [],
                        roles_id: []
                    }
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
