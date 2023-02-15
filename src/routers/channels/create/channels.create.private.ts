import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"

export const create_private = async (req: express.Request, res: express.Response) => { // Create a private channel
    try {

    const { friend_id } = req.params
    const token = req.token

    if (!token || !friend_id || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            friend_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || friend_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH) {

            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("Badly formatted")
            )
            return
        }
        var User = await UTILS.FUNCTIONS.find.user.token(token)
        var Friend = await UTILS.FUNCTIONS.find.user.id(parseInt(friend_id))

        Logger.log("Creating private channel between " + User.username + " and " + Friend.username)

        if (User.channels.length >= UTILS.CONSTANTS.CHANNEL.MAX_PRIVATE_CHANNELS) throw "You have reached the maximum number of private channels"



        // check if friend is blocked by user or user is blocked by friend 
        if (await UTILS.FUNCTIONS.find.user.blocked(User.user_id, Friend.user_id)) throw "Friend is blocked"
        if (await UTILS.FUNCTIONS.find.user.blocked(Friend.user_id, User.user_id)) throw "You are blocked"

        //if friend has message_privacy set to everyone or friends only
        if (Friend.message_privacy === UTILS.CONSTANTS.MESSAGE.PROPERTIES.MESSAGE_PRIVACY_FRIENDS) {
            if (!UTILS.FUNCTIONS.find.user.friend(User, Friend)) throw "Friend not found"
        }

        if (User.user_id === Friend.user_id) throw "You cannot create a private channel with yourself"

        // check if channel already exists between users 
        var Channel_Exists = await UTILS.FUNCTIONS.find.channel.friend(User, Friend)
        if (Channel_Exists) throw "Channel already exists"

        // create channel
        var Channel = await DB.channels.create({
            channel_id: Date.now() + Math.floor(Math.random() * 1000),
            channel_type: UTILS.CONSTANTS.CHANNEL.TYPE.HYBRID,
            channel_name: User.username + " and " + Friend.username,
            updated_at: new Date().toLocaleString(),
            created_at: new Date().toLocaleString(),
            members: [User.user_id, Friend.user_id],
            channel_category: "SERVER",
            members_count: 2,
            
            permissions: UTILS.CONSTANTS.PERMISSIONS.PRIVATE(User, Friend)
        })

        if(!Channel) throw "Channel not created"

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
            user_id: User.user_id,
            friend_id: Friend.user_id,
            channel: Channel
        })

        Logger.log("Sent private channel between " + User.username + " and " + Friend.username)

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage("Private channel created")
                .setData({ channel: Channel })
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
