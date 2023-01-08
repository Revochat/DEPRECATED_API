import express from "express"
import Emitter from "../../client/emitter.client"
import DB from "../../database"
import { RouteResponse, Status } from "../controller"
import Logger from "../../client/logger.client"
import { addFriend, removeFriend } from "./friends"
import { addBlocked, removeBlocked } from "./blocked"

export const UserInterceptSocials = {

    addFriend : addFriend,
    
    removeFriend : removeFriend,

    addBlocked: addBlocked,

    removeBlocked: removeBlocked
}