import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"
import { IMessageModel } from "../../database/models/Message"
import { v4, v5 } from "uuid"

export const MessagesIntercept = {
    send : async (req: express.Request, res: express.Response) => { // Send a message
        const {user_id, channel_id, token, message} = req.body
        try {
            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"

            if (!message) throw "Message cannot be empty"

            if (message.length > 2000) throw "Message cannot be longer than 2000 characters"

            var Channel = await DB.channels.find.id(channel_id) //if channel id is not found throw error
            if(!Channel) throw "Channel not found"

            var Message: IMessageModel = await DB.messages.create({
                // generate a random ID for the message
                message_id: parseInt((v5(message, v4()).split("-").join("") + Date.now()).toUpperCase()),
                user_id: user_id,
                channel_id: channel_id,
                message: message,
                updated_at: Date.toLocaleString(),
                created_at: Date.toLocaleString()
            })
            Logger.debug(`Message ${Message} has been sent`)
            Emitter.emit("sendMessage", Message)
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

    get : async (req: express.Request, res: express.Response) => { // Get a message
        const {message_id} = req.params
        try {
            if (!message_id) throw "Message ID cannot be empty"

            var Message = await DB.messages.find.id(message_id)
            if(!Message) throw "Message not found"
            Logger.debug(`Message ${Message} has been found`)
            Emitter.emit("getMessage", Message)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Message found`)
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

    delete : async (req: express.Request, res: express.Response) => { // Delete a message
        const {message_id} = req.params
        try {
            if (!message_id) throw "Message ID cannot be empty"

            var Message = await DB.messages.find.id(message_id)
            if(!Message) throw "Message not found"
         
            Logger.debug(`Message ${Message} has been found`)
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