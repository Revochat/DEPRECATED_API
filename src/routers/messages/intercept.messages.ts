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

            var Message: IMessageModel = await DB.messages.create({
                // generate a random ID for the message
                message_id: (v5(message, v4()).split("-").join("") + Date.now()).toUpperCase(),
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
    // get : async (req: express.Request, res: express.Response) => { // Get a message
    //     const {message_id} = req.params
    //     try {
    //         var Message = await DB.messages.find.id(message_id)
    //         if(!Message) throw "Message not found"
    //         Logger.debug(`Message ${Message} has been found`)
    //         Emitter.emit("getMessage", Message)
    //         res.json(
    //             new RouteResponse()
    //                 .setStatus(Status.success)
    //                 .setMessage(`Message found`)
    //                 .setData(Message)
    //         )
    //     }

    //     catch (err) {
    //         res.json(
    //             new RouteResponse()
    //                 .setStatus(Status.error)
    //                 .setMessage(err as string)
    //         )
    //     }
    // },

    // delete : async (req: express.Request, res: express.Response) => { // Delete a message
    //     const {message_id} = req.params
    //     try {
    //         var Message = await DB.messages.find.id(message_id)
    //         if(!Message) throw "Message not found"
    //         Logger.debug(`Message ${Message} has been found`)
    //         Emitter.emit("deleteMessage", Message)
    //         res.json(
    //             new RouteResponse()
    //                 .setStatus(Status.success)
    //                 .setMessage(`Message deleted`)
    //                 .setData(Message)
    //         )
    //     }

    //     catch (err) {
    //         res.json(
    //             new RouteResponse()
    //                 .setStatus(Status.error)
    //                 .setMessage(err as string)
    //         )
    //     }
    // },

    // getMessages : async (req: express.Request, res: express.Response) => { // Get messages in a channel (latest 50 messages)
    //     const {channel_id} = req.params
    //     try {
    //         var Messages = await DB.messages.find.channel(channel_id)
    //         if(!Messages) throw "Messages not found"
    //         Logger.debug(`Messages ${Messages} has been found`)
    //         Emitter.emit("getMessages", Messages)
    //         res.json(
    //             new RouteResponse()
    //                 .setStatus(Status.success)
    //                 .setMessage(`Messages found`)
    //                 .setData(Messages)
    //         )
    //     }

    //     catch (err) {
    //         res.json(
    //             new RouteResponse()
    //                 .setStatus(Status.error)
    //                 .setMessage(err as string)
    //         )
    //     }
    // }

    // get messages from specific user in a channel
    // get messages that match a specific string in a channel
}