import express from "express"
import Emitter from "../../client/emitter.client"
import DB from "../../database"
import bcrypt from "bcrypt"
import { RouteResponse, Status } from "../controller"
import Logger from "../../client/logger.client"
import { IUserModel } from "../../database/models/User"
import { Types } from "mongoose"
import {v4, v5}from "uuid"

export const ServerIntercept = {
    getChannels: async (req: any, res: any) => {

    },


    getServer: async (req: any, res: any) => {

    },

    getMembers: async (req: any, res: any) => {

    }
}