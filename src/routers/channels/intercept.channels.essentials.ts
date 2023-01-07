import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"
import { IMessageModel } from "../../database/models/Message"
import { v4, v5 } from "uuid"

export const ChannelsInterceptEssentials = {
    create : async (req: express.Request, res: express.Response) => { // Create a channel
        const { server_id, user_id } = req.body
        const { channel_name, token } = req.params

        if (!channel_name || !token || !user_id || channel_name.length >= 30 || token.length !== 45 || user_id.length !== 13 || (server_id && server_id.length !== 13) || (!server_id && server_id !== undefined)){ //type check
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

            if (server_id) { // If the channel is a server channel
                var Server = await DB.servers.find.id(server_id)
                if(!Server) throw "Server not found"
                if (!Server.members.includes(user_id)) throw "You are not a member of this server"

                // permissions check TODO

                var Channel = await DB.channels.create({
                    channel_id: Date.now() + Math.floor(Math.random() * 1000),
                    channel_name: channel_name,
                    owner_id: user_id,
                    server_id: server_id,
                    members: [user_id],
                    members_count: 1,
                    created_at: new Date().toLocaleString(),
                    updated_at: new Date().toLocaleString()
                })
            } else { // If the channel is a DM channel

                console.log("Creating DM channel")
                var Channel = await DB.channels.create({
                    channel_id: Date.now() + Math.floor(Math.random() * 1000),
                    channel_name: channel_name,
                    owner_id: user_id,
                    members: [user_id],
                    members_count: 1,
                    created_at: new Date().toLocaleString(),
                    updated_at: new Date().toLocaleString()
                })
            }

            await Channel.save()

            // Add the channel to the user
            User.channels.push(Channel.channel_id)
            await User.save()
    
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
        const {channel_id, token} = req.params

        if (!channel_id || !token || channel_id.length !== 13 || token.length !== 45){ //type check
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

            // Check if the user is a member of the channel
            if (!User.channels.includes(channel_id)) throw "You are not a member of this channel"

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

    remove : async (req: express.Request, res: express.Response) => { // Delete a channel
        const {channel_id, token} = req.params

        if (!channel_id || !token || channel_id.length !== 13 || token.length !== 45){ //type check
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("Badly formatted")
            )
            return
        }

        try {
            var Channel = await DB.channels.find.id(channel_id) // Find the channel
            if(!Channel) throw "Channel not found"

            var User = await DB.users.find.token(token) // Find the user
            if(!User) throw "User not found"

            console.log(User.user_id, Channel.owner_id)
            if (User.user_id !== Channel.owner_id) throw "You are not the owner of this channel" // Check if the user is the owner of the channel
            await Channel.delete()

            // remove the channel from the members 
            for (let i = 0; i < Channel.members.length; i++) {
                const member_id = Channel.members[i];
                var Member = await DB.users.find.id(member_id)
                if(!Member) throw "Member not found"
                var channel_id_temp = Channel.channel_id // temp variable to prevent error
                console.log(channel_id_temp)
                if (Member.channels && Channel) {
                    Member.channels = Member.channels.filter((channel) => channel !== channel_id_temp)
                }

                await Member.save()
            }

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
        const {channel_name} = req.body
        const {channel_id, token} = req.params

        if (!channel_id || !token || channel_id.length !== 13 || token.length !== 45 || channel_name.length >= 30){ //type check
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("Badly formatted")
            )
            return
        }

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
        const {channel_id, token} = req.params

        if (!channel_id || !token || channel_id.length !== 13 || token.length !== 45){ //type check
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("Badly formatted")
            )
            return
        }

        try {
            var Channel = await DB.channels.find.id(channel_id)
            if(!Channel) throw "Channel not found"

            // Check if the user is in the channel
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"

            if (Channel.members.includes(User.user_id)) throw "You are already in this channel"

            // Add the user to the channel
            Channel.members.push(User.user_id)
            Channel.members_count = Channel.members.length
            await Channel.save()

            // Add the channel to the user
            User.channels.push(Channel.channel_id)
            await User.save()

            Logger.debug(`User ${User} has joined channel ${Channel}`)
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
        const {channel_id, token} = req.params

        if (!channel_id || !token || channel_id.length !== 13 || token.length !== 45){ //type check
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("Badly formatted")
            )
            return
        }

        try {
            var Channel = await DB.channels.find.id(channel_id)
            if(!Channel) throw "Channel not found"

            // Check if the user is in the channel
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"

            if (!Channel.members.includes(User.user_id)) throw "You are not in this channel"

            // Remove the user from the channel
            Channel.members = Channel.members.filter((member) => member !== User.user_id)
            Channel.members_count = Channel.members.length
            await Channel.save()

            Logger.debug(`User ${User.user_id} has left channel ${Channel}`)
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
        const {channel_id, token} = req.params

        if (!channel_id || !token || channel_id.length !== 13 || token.length !== 45){ //type check
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("Badly formatted")
            )
            return
        }

        try {
            var Channel = await DB.channels.find.id(channel_id)
            if(!Channel) throw "Channel not found"

            // Check if the user is in the channel
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"

            if (!Channel.members.includes(User.user_id)) throw "You are not in this channel"

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

        if (!channel_id || !limit || channel_id.length !== 13 || limit.length > 3){ //type check
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("Badly formatted")
            )
            return
        }

        try {
            if (!limit) throw "Limit not provided"

            if (parseInt(limit) > 100) throw "Limit is too high"

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
    },

    sendMessage : async (req: express.Request, res: express.Response) => { // Send a message to a channel
        const {channel_id, user_id, message} = req.body

        if (!channel_id || !user_id || !message || channel_id.length !== 13 || user_id.length !== 13 || message.length > 1000){ //type check
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("Badly formatted")
            )
            return
        }

        try {
            var Channel = await DB.channels.find.id(channel_id)
            if(!Channel) throw "Channel not found"
            Logger.debug(`Sending message to channel ${Channel}`)

            // Check if the user is in the channel
            if (!Channel.members.includes(user_id)) throw "You are not in this channel"

            var Message: IMessageModel = await DB.messages.create({ // Create the message
                message_id: parseInt((v5(message, v4()).split("-").join("") + Date.now()).toUpperCase()),
                channel_id,
                user_id,
                message,
                created_at: Date.toLocaleString(),
                updated_at: Date.toLocaleString()
            })
            await Message.save() // Save the message to the database

            Emitter.emit("sendMessage", Message) // Emit the message to the client
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Message sent`)
                    .setData(Message)
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

    deleteMessage : async (req: express.Request, res: express.Response) => { // Delete a message from a channel
        const {channel_id, user_id, message_id} = req.body

        if (!channel_id || !user_id || !message_id || channel_id.length !== 13 || user_id.length !== 13 || message_id.length !== 13){ //type check
            res.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("Badly formatted")
            )
            return
        }
        
        try {
            var Channel = await DB.channels.find.id(channel_id)
            if(!Channel) throw "Channel not found"
            Logger.debug(`Deleting message from channel ${Channel}`)

            // Check if the user is in the channel
            if (!Channel.members.includes(user_id)) throw "You are not in this channel"

            // Delete the message
            var Message = await DB.messages.find.id(message_id)
            if(!Message) throw "Message not found"
            await Message.delete()

            Emitter.emit("deleteMessage", Message)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Message deleted`)
                    .setData(Message)
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