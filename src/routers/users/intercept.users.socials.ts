import express from "express"
import Emitter from "../../client/emitter.client"
import DB from "../../database"
import bcrypt from "bcrypt"
import { RouteResponse, Status } from "../controller"
import Logger from "../../client/logger.client"
import { IUserModel } from "../../database/models/User"
import { Types } from "mongoose"
import {v4, v5}from "uuid"

export const UserInterceptSocials = {

    addFriend : async (req: express.Request, res: express.Response) => { // Add a friend to the user
        try {
            const { token, friend_id } = req.params

            // if token or friend_id badly formatted
            if(!token || !friend_id || token.length !== 45 || friend_id.length !== 13) throw "Badly formatted"

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
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },
    
    removeFriend : async (req: express.Request, res: express.Response) => { // Remove a friend from the user
        try {
            const { token, friend_id } = req.params

            // if token or friend_id badly formatted
            if(!token || !friend_id || token.length !== 45 || friend_id.length !== 13) throw "Badly formatted"

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
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },

    addBlocked: async (req: express.Request, res: express.Response) => { // Add a blocked user to the user
        try {
            const { token, blocked_id } = req.params

            // if token or blocked_id badly formatted
            if(!token || !blocked_id || token.length !== 45 || blocked_id.length !== 13) throw "Badly formatted"

            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            User.blocked.push(blocked_id)
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            Emitter.emit("addBlocked", User)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Blocked added`)
                    .setData(User)
            )
        }
        catch(err) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },

    removeBlocked: async (req: express.Request, res: express.Response) => { // Remove a blocked user from the user
        try {
            const { token, blocked_id } = req.params

            // if token or blocked_id badly formatted
            if(!token || !blocked_id || token.length !== 45 || blocked_id.length !== 13) throw "Badly formatted"

            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            User.blocked.splice(User.blocked.indexOf(blocked_id), 1)
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            Emitter.emit("removeBlocked", User)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Blocked removed`)
                    .setData(User)
            )
        }
        catch(err) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    }
}