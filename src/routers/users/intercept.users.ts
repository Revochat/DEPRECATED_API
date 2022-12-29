import express from "express"
import Emitter from "../../client/emitter.client"
import DB from "../../database"
import bcrypt from "bcrypt"
import { RouteResponse, Status } from "../controller"
import Logger from "../../client/logger.client"
import { IUserModel } from "../../database/models/User"
import { Types } from "mongoose"
import {v4, v5}from "uuid"


export const UserIntercept = {
    register : async (req: express.Request, res: express.Response) => { // Register a new user
        try {
            const { username, password } = req.params

            var user = await DB.users.find.username(username)
            if (user) throw "User already exists"

            var User: IUserModel & {_id: Types.ObjectId} = await DB.users.create({
                username: username,
                password: await bcrypt.hash(password, 10),
                token: (v5(username, v4()).split("-").join("") + Date.now()).toUpperCase(),
                user_id: Date.now() + Math.floor(Math.random() * 1000),
            })

            Logger.success(`User ${username} has been registered`)
            Emitter.emit("register", User)

            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage("Successfully register")
                    .setData(User)
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

    connect : async (req: express.Request, res: express.Response) => { // Connect a user
        try {
            const { username, password } = req.params

            var User = await DB.users.find.username(username)

            var match = false
            if(User) match = await bcrypt.compare(password, User.password)

            if (!match || !User){
                Logger.warn(`A user tried to log in with an invalid password from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress} !`)
                Emitter.emit("connect", null, req.headers['x-forwarded-for'] || req.connection.remoteAddress) 
                throw "Username or password invalid"
            }

            Emitter.emit("connect", User, null)
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`Successfully connect to the user ${username}`)
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

    get : {
        id : async (req: express.Request, res: express.Response) => { // Get the user ID
            try{
    
                const { id} = req.params
                var User = await DB.users.find.id(parseInt(id))
                if(!User) throw "User not found"
                Logger.debug(`User ${User} has been found`)
                Emitter.emit("getUser", User)
                res.json(
                    new RouteResponse()
                        .setStatus(Status.success)
                        .setMessage(`User found`)
                        .setData({
                            username: User.username,
                            user_id: User.user_id,
                            created_at: User.created_at,
                        })
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
        token : (req: express.Request, res: express.Response) => { // Get the user ID
            const { token } = req.params
            

            Emitter.emit("getUser", token)
            // GET THE USER ID FROM THE TOKEN
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`You are getting the user ID: ${token}`)
            )
        },
    },

    

    

    channel: (req: express.Request, res: express.Response): void => {
        Emitter.emit("channel", req.params.token)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`You are in the channel ID: ${req.params.token}`)
        )
    },

    messages: (req: express.Request, res: express.Response): void => {
        Emitter.emit("messages", req.params.token)
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setMessage(`You are sending a message to the user ID: ${req.params.token}`)
        )
    },


    // ERROR HANDLER OF WRONG ROUTES
}