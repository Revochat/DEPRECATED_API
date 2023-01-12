import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"

export const removeFriend = async (req: express.Request, res: express.Response) => { // Remove a friend from the user
    
    try {
        const { token, friend_id } = req.params

        // if token or friend_id badly formatted
        if(!token || !friend_id || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH ||
            friend_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || friend_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH ) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        // Check if the friend is not added
        if(!User.friends.includes(friend_id)) { // If the friend is not added, check if the user has a friend request from the friend

            // Check if the user has a friend request from the friend
            if(User.friends_requests_received.includes(friend_id)) {

                // Remove the friend request from the user
                User.friends_requests_received.splice(User.friends_requests_received.indexOf(friend_id), 1)
                User.updated_at = new Date().toLocaleString()
                User.save()

                // update the friend
                var Friend = await DB.users.find.id(parseInt(friend_id))
                if(!Friend) throw "Friend not found"
                if (Friend.friends_requests_sent) Friend.friends_requests_sent.splice(Friend.friends_requests_sent.indexOf(Friend.user_id), 1)
                Friend.updated_at = new Date().toLocaleString()
                Friend.save()
                Logger.debug(`User ${User} has been updated`)
                Logger.debug(`User ${Friend} has been updated`)
                Emitter.emit("removeFriend", User)
                res.json(
                    new RouteResponse()
                        .setStatus(Status.success)
                        .setMessage(`Friend Request_received removed`)
                        .setData(User)
                )
            } else if (User.friends_requests_sent.includes(friend_id)) { // Check if the user has sent a friend request to the friend

                // Remove the friend request from the user
                User.friends_requests_sent.splice(User.friends_requests_sent.indexOf(friend_id), 1)
                User.updated_at = new Date().toLocaleString()
                User.save()

                // update the friend
                var Friend = await DB.users.find.id(parseInt(friend_id))
                if(!Friend) throw "Friend not found"
                if (Friend.friends_requests_received) Friend.friends_requests_received.splice(Friend.friends_requests_received.indexOf(User.id.toString()), 1)
                Friend.updated_at = new Date().toLocaleString()
                Friend.save()
                Logger.debug(`User ${User} has been updated`)
                Logger.debug(`User ${Friend} has been updated`)
                Emitter.emit("removeFriend", User)
                res.json(
                    new RouteResponse()
                        .setStatus(Status.success)
                        .setMessage(`Friend Request_sent removed`)
                        .setData(User)
                )
            }

            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Error removing friend`)
            )

        } else { // If the friend is added, remove the friend from the user
            User.friends.splice(User.friends.indexOf(friend_id), 1)
            User.updated_at = new Date().toLocaleString()
            User.save()

            // update the friend
            var Friend = await DB.users.find.id(parseInt(friend_id))
            if(!Friend) throw "Friend not found"
            if (Friend.friends) Friend.friends.splice(Friend.friends.indexOf(User.id.toString()), 1)
            Friend.updated_at = new Date().toLocaleString()
            Friend.save()

            Logger.debug(`User ${User} has been updated`)
            Emitter.emit("removeFriend", User)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friend removed`)
                    .setData(User)
            )
        }
    }
    catch(err) {
        res.status(400)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}