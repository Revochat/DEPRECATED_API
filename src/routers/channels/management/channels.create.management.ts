import express from "express"
import { RouteResponse, Status } from "../../controller"
import Emitter from "../../../client/emitter.client"
import Logger from "../../../client/logger.client"
import DB from "../../../database"
import UTILS from "../../../utils"
export const create = async (req: express.Request, res: express.Response) => { // Create a channel
    const { server_id, user_id, channel_type, channel_env } = req.body
    const { channel_name, token } = req.params

    if (!channel_name || !token || !user_id || channel_name.length >= UTILS.CONSTANTS.CHANNEL.NAME.MAX_NAME_LENGTH || channel_name.length <= UTILS.CONSTANTS.CHANNEL.NAME.MIN_NAME_LENGTH || // Channel name check
        token.length !== UTILS.CONSTANTS.USER.TOKEN.DEFAULT_TOKEN_LENGTH || user_id.length !== UTILS.CONSTANTS.USER.ID.DEFAULT_LENGTH || // Token and user id check
        (channel_type >= 0 && channel_type <= 2) || // channel type check
        ((server_id && server_id.length !== UTILS.CONSTANTS.SERVER.SERVER.DEFAULT_ID_LENGTH) || (!server_id && server_id !== undefined))) { // Server id check
        
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

        // if (User.channels.length >= UTILS.CONSTANTS.CHANNEL.MAX_PRIVATE_CHANNELS) throw "You have reached the maximum number of private channels"

        // create default role
        var Role = await DB.role.create({
            role_id: Date.now() + Math.floor(Math.random() * 1000),
            role_name: "Default",
            role_color: "#000000",
            role_position: 0,

            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString(),
            permissions: {
                server: {
                    manage: false, // manage server name, icon, description, etc..
    
                    role: {
                        create: false, // create roles/permissions
                        manage: false, // manage member roles
                    },
    
                    member: {
                        manage: false, // mute, deafen, disconnect users
                        kick: false,
                        ban: false,
                    },
    
                    channel: {
                        create: false,
                        delete: false,
                        view: false, // view channel
                        interact: false, // can a user join the vocal channel or type in chat
                        speak: false, // can a user speak in vocal channel
                        video: false, // share video
                        move: false, // move channel to another category
                        manage: false, // manage channels name, who can view it..
                    },
        
                    message: {
                        send: false, 
                        delete: false,
                        // pin: false, // manage messages: pin, unpin
                        mentions: false, // mention everyone, here, roles
                        send_file: false,
                        // use commands..
                    }
    
                    // reactions: {
                    //     add: false,
                    //     remove: false,
                    // }
                }
            }
            
        })
        await Role.save()
        
        if (server_id && channel_env == 2) { // If the channel is a server channel
            var Server = await DB.servers.find.id(server_id)
            if(!Server) throw "Server not found"
            if (!Server.members.includes(user_id)) throw "You are not a member of this server"

            if (channel_env == 0) {
                Logger.debug(`Creating DM channel`)
                var Channel = await DB.channels.create({
                    channel_id: Date.now() + Math.floor(Math.random() * 1000),
                    channel_name: channel_name,
                    channel_type: channel_type,
                    channel_env: channel_env,
                    owner_id: user_id,
                    members: [user_id],
                    members_count: 1,
                    created_at: new Date().toLocaleString(),
                    updated_at: new Date().toLocaleString(),
                    
                    permission_id: Role.role_id 
                })
            } else if (channel_env == 2) {
                // permissions check TODO
                Logger.debug(`Creating server channel`)
                var Channel = await DB.channels.create({
                    server_id: server_id,
                    channel_id: Date.now() + Math.floor(Math.random() * 1000),
                    channel_name: channel_name,
                    channel_type: channel_type,
                    channel_env: channel_env,
                    owner_id: user_id,
                    members: [user_id],
                    members_count: 1,
                    created_at: new Date().toLocaleString(),
                    updated_at: new Date().toLocaleString(),

                    permission_id: Role.role_id
                })
            } else if (channel_env == 1) {
                Logger.debug(`Creating group channel`)
                var Channel = await DB.channels.create({
                    channel_id: Date.now() + Math.floor(Math.random() * 1000),
                    channel_name: channel_name,
                    channel_type: channel_type,
                    channel_env: channel_env,
                    owner_id: user_id,
                    members: [user_id],
                    members_count: 1,
                    created_at: new Date().toLocaleString(),
                    updated_at: new Date().toLocaleString(),
                    
                    permission_id: Role.role_id 
                })
        } else {
            throw "Badly formatted"
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
    }

    catch (err) {
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
    }
}