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
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"

            //TEST CASES

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
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"

            // Check if the friend is not added
            if(!User.friends.includes(friend_id)) throw "User not added"

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
        catch(err) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },

    getFriends : async (req: express.Request, res: express.Response) => { // Get the friends of the user
        try {
            const { token } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            var Friends = await DB.users.find.many(User.friends)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friends found`)
                    .setData(Friends)
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
    getFriendRequests : async (req: express.Request, res: express.Response) => { // Get the friend requests of the user
        try {
            const { token } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            var Friends = await DB.users.find.many(User.friends_requests)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friend requests found`)
                    .setData(Friends)
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

    getChannels : async (req: express.Request, res: express.Response) => { // Get the channels of the user
        try {
            const { token } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            var Channels = User.channels
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Channels found`)
                    .setData(Channels)
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

    getServers : async (req: express.Request, res: express.Response) => { // Get the servers of the user
        try {
            const { token } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            var Servers = User.servers
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Servers found`)
                    .setData(Servers)
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

    addBlocked: async (req: express.Request, res: express.Response) => { // Add a blocked user to the user
        try {
            const { token, blocked_id } = req.params
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
    },

    getBlocked: async (req: express.Request, res: express.Response) => { // Get the blocked users of the user
        try {
            const { token } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            var Blocked = await DB.users.find.many(User.blocked)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Blocked found`)
                    .setData(Blocked)
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

    addFriendRequestSent: async (req: express.Request, res: express.Response) => { // Add a friend request sent to the user
        try {
            const { token, friend_id } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            User.friend_requests_sent.push(friend_id)
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            Emitter.emit("addFriendRequestSent", User)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friend request sent added`)
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

    removeFriendRequestSent: async (req: express.Request, res: express.Response) => { // Remove a friend request sent from the user
        try {
            const { token, friend_id } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            User.friend_requests_sent.splice(User.friend_requests_sent.indexOf(friend_id), 1)
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            Emitter.emit("removeFriendRequestSent", User)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friend request sent removed`)
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

    getFriendRequestsSent: async (req: express.Request, res: express.Response) => { // Get the friend requests sent of the user
        try {
            const { token } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            var FriendRequestsSent = await DB.users.find.many(User.friend_requests_sent)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friend requests sent found`)
                    .setData(FriendRequestsSent)
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