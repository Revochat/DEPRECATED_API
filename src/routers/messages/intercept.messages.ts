import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"

import { send } from "./message.send"
import { remove } from "./message.remove"

export const MessagesIntercept = {
    get : async (req: express.Request, res: express.Response) => { // Get a message
        try {
            const {message_id} = req.params
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
    send: send,
    remove: remove
}