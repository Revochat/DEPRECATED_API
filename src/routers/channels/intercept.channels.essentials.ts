import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"
import { IChannelModel } from "../../database/models/Channel"
import { v4, v5 } from "uuid"

export const ChannelsInterceptEssentials = {

    create : async (req: express.Request, res: express.Response) => { // Create a channel
        const {user_id , token, channel_name, server_id} = req.body
        try {
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"

            var Channel: IChannelModel = await DB.channels.create({
                // generate a random ID for the channel
                server_id: server_id,
                channel_id: parseInt((v5(channel_name, v4()).split("-").join("") + Date.now()).toUpperCase()),
                channel_name: channel_name,
                owner_id: user_id,
                members: [user_id],
                members_count: 1,
                updated_at: Date.toLocaleString(),
                created_at: Date.toLocaleString()
            })
            Logger.debug(`Channel ${Channel} has been created`)
            Emitter.emit("createChannel", Channel)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Channel created`)
                    .setData(Channel)
            )
        }

        catch (err) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },

    get : async (req: express.Request, res: express.Response) => { // Get a channel data by ID
        const {channel_id} = req.params
        try {
            var Channel = await DB.channels.find.id(channel_id)
            if(!Channel) throw "Channel not found"
            Logger.debug(`Channel ${Channel} has been found`)
            Emitter.emit("getChannel", Channel)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Channel found`)
                    .setData(Channel)
            )
        }

        catch (err) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },

    delete : async (req: express.Request, res: express.Response) => { // Delete a channel
        const {channel_id, token} = req.params
        try {
            var Channel = await DB.channels.find.id(channel_id) // Find the channel
            if(!Channel) throw "Channel not found"


            var User = await DB.users.find.token(token) // Find the user
            if(!User) throw "User not found"

            if (User.user_id !== Channel.owner_id) throw "You are not the owner of this channel" // Check if the user is the owner of the channel
            await Channel.delete()

            Logger.debug(`Channel ${Channel} has been deleted`)
            Emitter.emit("deleteChannel", Channel)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Channel deleted`)
                    .setData(Channel)
            )
        }
        catch (err) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },

    update : async (req: express.Request, res: express.Response) => { // Update a channel
        const {channel_id, channel_name, token} = req.body
        try {
            var User = await DB.users.find.token(token) // Find the user
            if(!User) throw "User not found" // Check if the user exists
            var Channel = await DB.channels.find.id(channel_id) // Find the channel
            if(!Channel) throw "Channel not found" // Check if the channel exists
            if (User.user_id !== Channel.owner_id) throw "You are not the owner of this channel" // Check if the user is the owner of the channel

            Channel.channel_name = channel_name // Update the channel name
            Channel.updated_at = Date.toLocaleString()
            await Channel.save() // Save the channel
            Logger.debug(`Channel ${Channel} has been updated`)
            Emitter.emit("updateChannel", Channel)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Channel updated`)
                    .setData(Channel)
            )
        }
        catch (err) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },

    join : async (req: express.Request, res: express.Response) => { // Join a channel
        const {channel_id, user_id} = req.body
        try {
            var Channel = await DB.channels.find.id(channel_id)
            if(!Channel) throw "Channel not found"
            Logger.debug(`User ${user_id} has joined channel ${Channel}`)

            // Check if the user is already in the channel
            if (Channel.members.includes(user_id)) throw "You are already in this channel"

            // Add the user to the channel
            Channel.members.push(user_id)
            Channel.members_count = Channel.members.length
            await Channel.save()

            Emitter.emit("joinChannel", Channel)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Channel joined`)
                    .setData(Channel)
            )
        }
        catch (err) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },

    leave : async (req: express.Request, res: express.Response) => { // Leave a channel
        const {channel_id, user_id} = req.body
        try {
            var Channel = await DB.channels.find.id(channel_id)
            if(!Channel) throw "Channel not found"
            Logger.debug(`User ${user_id} has left channel ${Channel}`)

            // Remove the user from the channel
            Channel.members = Channel.members.filter((member) => member !== user_id) // Remove the user from the channel
            Channel.members_count = Channel.members_count-1 // Update the members count
            await Channel.save()
            Emitter.emit("leaveChannel", Channel)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Channel left`)
                    .setData(Channel)
            )
        }
        catch (err) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },

    getMembers : async (req: express.Request, res: express.Response) => { // Get the members of a channel
        const {channel_id} = req.params
        try {
            var Channel = await DB.channels.find.id(channel_id)
            if(!Channel) throw "Channel not found"
            Logger.debug(`Getting members of channel ${Channel}`)
            res.json(
                new RouteResponse()

                    .setStatus(Status.success)
                    .setMessage(`Channel members`)
                    .setData(Channel.members)
            )
        }
        catch (err) {
            res.json(
                new RouteResponse()

                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    },

    getMessages : async (req: express.Request, res: express.Response) => { // Get the x number of last messages of a channel
        const {channel_id, limit} = req.params
        try {
            var Channel = await DB.channels.find.id(channel_id)
            if(!Channel) throw "Channel not found"
            Logger.debug(`Getting messages of channel ${Channel}`)

            var Messages = DB.channels.find.messages(channel_id, parseInt(limit)) // needs testing (not sure if it works)

            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Channel messages`)
                    .setData(Messages)
            )
        }
        catch (err) {
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage(err as string)
            )
        }
    }
}