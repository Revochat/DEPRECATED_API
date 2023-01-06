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

    addServer : async (req: express.Request, res: express.Response) => { // Add a server to the user
        try {
            const { token, server_id } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            User.servers.push(server_id)
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            Emitter.emit("addServer", User)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Server added`)
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

    removeServer : async (req: express.Request, res: express.Response) => { // Remove a server from the user
        try {
            const { token, server_id } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            User.servers.splice(User.servers.indexOf(server_id), 1)
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            Emitter.emit("removeServer", User)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Server removed`)
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

    addChannel : async (req: express.Request, res: express.Response) => { // Add a channel to the user
        try {
            const { token, channel_id } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            User.channels.push(channel_id)
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            Emitter.emit("addChannel", User)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Channel added`)
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

    removeChannel : async (req: express.Request, res: express.Response) => { // Remove a channel from the user
        try {
            const { token, channel_id } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            User.channels.splice(User.channels.indexOf(channel_id), 1)
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            Emitter.emit("removeChannel", User)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Channel removed`)
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

    addFriend : async (req: express.Request, res: express.Response) => { // Add a friend to the user
        try {
            const { token, friend_id } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"

            // Check if the friend is already added
            if(User.friends.includes(friend_id)) throw "Friend already added"

            User.friends.push(friend_id)
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            Emitter.emit("addFriend", User)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friend added`)
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
    
    removeFriend : async (req: express.Request, res: express.Response) => { // Remove a friend from the user
        try {
            const { token, friend_id } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            User.friends.splice(User.friends.indexOf(friend_id), 1)
            User.updated_at = new Date().toLocaleString()
            User.save()
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

    addFriendRequest : async (req: express.Request, res: express.Response) => { // Add a friend request to the user
        try {
            const { token, friend_id } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            User.friends_requests.push(friend_id)
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            Emitter.emit("addFriendRequest", User)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friend request added`)
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

    removeFriendRequest : async (req: express.Request, res: express.Response) => { // Remove a friend request from the user
        try {
            const { token, friend_id } = req.params
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            User.friends_requests.splice(User.friends_requests.indexOf(friend_id), 1)
            User.updated_at = new Date().toLocaleString()
            User.save()
            Logger.debug(`User ${User} has been updated`)
            Emitter.emit("removeFriendRequest", User)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Friend request removed`)
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
    }
    
}