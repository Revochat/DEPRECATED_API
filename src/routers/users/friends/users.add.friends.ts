import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"


export const addFriend = async (req: express.Request, res: express.Response) => { // Add a friend to the user
    try {
        Logger.debug(`User ${req.params.token} is trying to add a friend`)
        const { token, friend_id } = req.params

        // if token or friend_id badly formatted
        if(!token || !friend_id || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH ||
            friend_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || friend_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH) throw "Badly formatted"

        var User = await DB.users.find.token(token)
        if(!User) throw "User not found"

        // Check if the friend is already added
        if(User.friends.includes(friend_id)) throw "User already added"

        // Check if the friend is already requested
        if(User.friends_requests_sent.includes(friend_id)) throw "User already requested"

        // Check if the friend is already blocked
        if(User.blocked.includes(friend_id)) throw "User is blocked"

        //Check if the friend exists
        var Friend = await DB.users.find.id(parseInt(friend_id))
        if(!Friend) throw "Friend not found"

        if (Friend.blocked) { // Check if user is already blocked by the friend in the database
            if(Friend.blocked.includes(User.id.toString())) throw "User is blocked"
        }

        if (Friend.friends_requests_received) { // Check if user is already requested by the friend
            if(Friend.friends_requests_received.includes(User.id.toString())) throw "User already requested"
        }

        // DATABASE UPDATES

        if (User.friends_requests_received.includes(friend_id)) { // If the user has a friend request from the friend, accept it and remove the request from the friend
            User.friends_requests_received.splice(User.friends_requests_received.indexOf(friend_id), 1) // Remove the request from the user
            if (Friend.friends_requests_received) {
                Friend.friends_requests_received.splice(Friend.friends_requests_received.indexOf(User.id.toString()), 1) // remove the request from the friend 
            }

            // Add the user to the friend
            if (Friend.friends) {
                Friend.friends.push(User.user_id)
            } else {
                Friend.friends = [User.user_id]
            }
            // Add the friend to the user
            if (User.friends) {
                User.friends.push(friend_id)
            } else {
                User.friends = [friend_id]
            }

            // Save the user
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            // save the friend
            Friend.updated_at = new Date().toLocaleString()
            Friend.save()
            Logger.debug(`User ${Friend} has been updated`)

            // Emit the event
            Emitter.emit("addFriend", Friend)

            // Send the response
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friend added`)
                    .setData(Friend)
            )
        } else { // If the user doesn't have a friend request from the friend, send a request to the friend 
            if (Friend.friends_requests_received) {
                Friend.friends_requests_received.push(User.user_id)
                User.friends_requests_sent = [Friend.user_id]
            }

            // update the friend
            Friend.updated_at = new Date().toLocaleString()
            Friend.save()
            Logger.debug(`User ${Friend} has been updated`)

            // update the user 
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            
            res.json(

                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friend request sent`)
                    .setData(Friend)
            )
        }
    }
    catch (err) {
        res.status(400)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}