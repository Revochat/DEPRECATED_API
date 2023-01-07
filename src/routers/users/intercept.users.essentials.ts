import express from "express"
import Emitter from "../../client/emitter.client"
import DB from "../../database"
import bcrypt from "bcrypt"
import { RouteResponse, Status } from "../controller"
import Logger from "../../client/logger.client"
import { IUserModel } from "../../database/models/User"
import { Types } from "mongoose"
import {v4, v5}from "uuid"


export const UserInterceptEssentials = {
    register : async (req: express.Request, res: express.Response) => { // Register a new user
        try {
            const { username, password } = req.params

            // if username or password badly formatted
            if(!username || !password || username.length >= 20 ||password.length >= 30) throw "Badly formatted"

            var user = await DB.users.find.username(username)
            if (user) throw "User already exists"

            var User: IUserModel & {_id: Types.ObjectId} = await DB.users.create({
                username: username,
                password: await bcrypt.hash(password, 10),
                token: (v5(username, v4()).split("-").join("") + Date.now()).toUpperCase(),
                user_id: Date.now() + Math.floor(Math.random() * 1000),
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString()
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

            // if username or password badly formatted
            if(!username || !password || username.length >= 20 ||password.length >= 30) throw "Badly formatted"

            var User = await DB.users.find.username(username)

            var match = false
            if(User) match = await bcrypt.compare(password, User.password)

            if (!match || !User){
                Logger.warn(`A user tried to log in with an invalid password from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress} !`)
                Emitter.emit("connect", null, req.headers['x-forwarded-for'] || req.connection.remoteAddress) 
                throw "Username or password invalid"
            }

            // refresh the token of the user to avoid the token to be the same as the previous one
            User.token = (v5(username + Date.now(), v4()).split("-").join("") + Date.now()).toUpperCase() // generate a new token

            User.last_connection = new Date().toLocaleString()
            User.save() //update the last connection date of the user in the database

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

    getUser : async (req: express.Request, res: express.Response) => { // Get a user
        try {
            const { token } = req.params

            // if token badly formatted
            if(!token || token.length !== 45) throw "Badly formatted"

            var User = await DB.users.find.token(token)
            if(!User) throw "User not found"
            res.json(
                new RouteResponse()
                    .setStatus(Status.success)
                    .setMessage(`User found`)
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

    update : { 
        username : async (req: express.Request, res: express.Response) => { // Update the username
            try {
                const { token, newusername } = req.params

                // if token or newusername badly formatted
                if(!token || !newusername || token.length !== 45 || newusername.length >= 20) throw "Badly formatted"

                var User = await DB.users.find.token(token)
                if(!User) throw "User not found"
                User.username = newusername
                User.updated_at = new Date().toLocaleString()
                User.save() //update the username of the user in the database

                Logger.debug(`User ${User} has been updated`)
                Emitter.emit("updateUsername", User)
                res.json(
                    new RouteResponse()
                        .setStatus(Status.success)
                        .setMessage(`Username updated`)
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
        password : async (req: express.Request, res: express.Response) => { // Update the password
            try {
                const { token, newpassword } = req.params

                // if token or newpassword badly formatted
                if(!token || !newpassword || token.length !== 45 || newpassword.length >= 30) throw "Badly formatted"

                var User = await DB.users.find.token(token)
                if(!User) throw "User not found"
                User.password = await bcrypt.hash(newpassword, 10)
                User.updated_at = new Date().toLocaleString()
                User.save()
                Logger.debug(`User ${User} has been updated`)
                Emitter.emit("updatePassword", User)
                res.json(
                    new RouteResponse()
                        .setStatus(Status.success)
                        .setMessage(`Password updated`)
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
        profile_picture : async (req: express.Request, res: express.Response) => { // Update the profile picture
            try {
                const { token, newprofile_picture } = req.params

                // PROFILE PICTURE HANDLE

                // if token or newprofile_picture badly formatted
                if(!token || !newprofile_picture || token.length !== 45 || newprofile_picture.length >= 100) throw "Badly formatted"

                var User = await DB.users.find.token(token)
                if(!User) throw "User not found"
                User.profile_picture = newprofile_picture
                User.updated_at = new Date().toLocaleString()
                User.save()
                Logger.debug(`User ${User} has been updated`)
                Emitter.emit("updateProfilePicture", User)
                res.json(
                    new RouteResponse()
                        .setStatus(Status.success)
                        .setMessage(`Profile picture updated`)
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
        wallet_token : async (req: express.Request, res: express.Response) => { // Update the wallet token
            try {
                const { token, newwallet_token } = req.params
                var User = await DB.users.find.token(token)
                if(!User) throw "User not found"
                User.wallet_token = newwallet_token
                User.updated_at = new Date().toLocaleString()
                User.save()
                Logger.debug(`User ${User} has been updated`)
                Emitter.emit("updateWalletToken", User)
                res.json(
                    new RouteResponse()
                        .setStatus(Status.success)
                        .setMessage(`Wallet token updated`)
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
        }
    }
}