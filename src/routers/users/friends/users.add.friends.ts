import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import UTILS from "../../../utils"


export const addFriend = async (req: express.Request, res: express.Response) => { // Add a friend to the user
    try {
        const { friend_id } = req.params
        const token = req.token

        if(!token || !friend_id || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            friend_id.length < UTILS.CONSTANTS.USER.ID.MIN_LENGTH || friend_id.length > UTILS.CONSTANTS.USER.ID.MAX_LENGTH) throw "Badly formatted" // Type Check

        var User = await UTILS.FUNCTIONS.find.user.token(token) // Find the user
        if (!User) throw "User not found"

        // Check if the friend is already added
        if(User.friends.includes(friend_id)) throw "User already added"

        // Check if the friend is already requested
        if(User.friends_requests_sent.includes(friend_id)) throw "User already requested"

        // Check if the friend is already blocked
        if(User.blocked.includes(friend_id)) throw "User is blocked"

        //Check if the friend exists
        var Friend = await UTILS.FUNCTIONS.find.user.id(parseInt(friend_id))
        if(!Friend) throw "Friend not found"

        // Check if the user is itself
        if(User.user_id.toString() === friend_id) throw "User is itself"

        if (Friend.blocked) { // Check if user is already blocked by the friend in the database
            if(Friend.blocked.includes(User.id.toString())) throw "User is blocked"
        }

        if (Friend.friends_requests_received) { // Check if user is already requested by the friend
            if(Friend.friends_requests_received.includes(User.id.toString())) throw "User already requested"
        }

        // DATABASE UPDATES

        if (User.friends_requests_received.includes(friend_id)) { // If the user has a friend request from the friend, accept it and remove the request from the friend
            Logger.debug(`User ${User.user_id} is accepting a friend request from ${Friend.user_id}`)
            
            User.friends_requests_received.splice(User.friends_requests_received.indexOf(friend_id), 1) // Remove the request from the user
            if (Friend.friends_requests_received) { // this check is useless but it's here to avoid errors
                Friend.friends_requests_received.splice(Friend.friends_requests_received.indexOf(User.user_id.toString()), 1) // remove the request from the friend 
            }

            // Add the user to the friend
            if (Friend.friends) {
                Friend.friends.push(User.user_id)
            } else {
                Friend.friends = [User.user_id]
            }
            // Add the friend to the user
            if (User.friends) {
                User.friends.push(Friend.user_id)
            } else {
                User.friends = [Friend.user_id]
            }

            // Save the user
            User.updated_at = new Date().toLocaleString()
            User.save()

            // save the friend
            Friend.updated_at = new Date().toLocaleString()
            Friend.save()

            // Emit the event
            Emitter.emit("addFriend", Friend)

            // cut sensitive data
            const Friend_Public_Info = UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(Friend.toObject()) // cut sensitive data and convert to object to avoid errors with mongoose

            // Send the response
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friend added`)
                    .setData(Friend_Public_Info)
            )
        } else { // If the user doesn't have a friend request from the friend, send a request to the friend 
            Logger.debug(`User ${User.user_id} is sending a friend request to ${Friend.user_id}`)

            // Add the user to the friend
            if (Friend.friends_requests_received) {
                Friend.friends_requests_received.push(User.user_id)
            } else {
                Friend.friends_requests_received = [User.user_id]
            }

            // Add the friend to the user
            if (User.friends_requests_sent) {
                User.friends_requests_sent.push(Friend.user_id)
            } else {
                User.friends_requests_sent = [Friend.user_id]
            }

            // update the friend
            Friend.updated_at = new Date().toLocaleString()
            Friend.save()

            // update the user 
            User.updated_at = new Date().toLocaleString()
            User.save()

            // Emit the event
            Emitter.emit("addFriend", Friend)

            const Friend_Public_Info = UTILS.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(Friend.toObject()) // cut sensitive data and convert to object to avoid errors with mongoose
            
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friend request sent`)
                    .setData(Friend_Public_Info)
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