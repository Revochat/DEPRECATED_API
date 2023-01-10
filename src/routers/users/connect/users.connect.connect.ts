import express from "express"
import DB from "../../../database"
import Logger from "../../../client/logger.client"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import bcrypt from "bcrypt"
import { v4, v5 } from "uuid"
import Controller from "../../controller/router.controller"

export const userConnect = async (req: express.Request, res: express.Response) => { // Login a user
    
}