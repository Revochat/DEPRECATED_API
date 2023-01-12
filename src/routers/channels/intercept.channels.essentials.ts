import express from "express"
import { RouteResponse, Status } from "../controller"
import Emitter from "../../client/emitter.client"
import Logger from "../../client/logger.client"
import DB from "../../database"

import { remove, leave } from "./management"
import { update } from "./update/"
import { getChannel, getMembers, getMessages } from "./get/"
import { sendMessage, deleteMessage } from "./messages"
import { add } from "./user"

export const ChannelsInterceptEssentials = {

    update: update,
    get: {
        channel: getChannel,
        members: getMembers,
        messages: getMessages
    },
    messages: {
        send: sendMessage,
        delete: deleteMessage
    },
    management: {
        // create: create,
        remove: remove,
        leave: leave
    },
    user: {
        add: add
    }
}