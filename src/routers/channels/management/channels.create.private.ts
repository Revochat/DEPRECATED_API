// import express from "express"
// import { RouteResponse, Status } from "../../controller"
// import Emitter from "../../../client/emitter.client"
// import Logger from "../../../client/logger.client"
// import DB from "../../../database"
// import UTILS from "../../../utils"

// export const create_private = async (req: express.Request, res: express.Response) => { // Create a private channel
//     const { user_id, friend_id } = req.body
//     const { channel_name, token } = req.params

//     if (!channel_name || !token || !user_id || channel_name.length >= UTILS.CONSTANTS.CHANNEL.NAME.MAX_NAME_LENGTH || channel_name.length <= UTILS.CONSTANTS.CHANNEL.NAME.MIN_NAME_LENGTH || // Channel name check
//         token.length !== UTILS.CONSTANTS.USER.TOKEN.DEFAULT_TOKEN_LENGTH || user_id.length !== UTILS.CONSTANTS.USER.ID.DEFAULT_LENGTH ) {

//         res.json(
//             new RouteResponse()
//                 .setStatus(Status.error)
//                 .setMessage("Badly formatted")
//         )
//         return
//     }

//     try {
//         var User = await DB.users.find.token(token)
//         if(!User) throw "User not found"

//         // if (User.channels.length >= UTILS.CONSTANTS.CHANNEL.MAX_PRIVATE_CHANNELS) throw "You have reached the maximum number of private channels"

//         // create default role
//         var Role = await DB.role.create({
//             role_id: Date.now() + Math.floor(Math.random() * 1000),
//             role_name: "default",
//             role_color: "#000000",
//             role_position: 0,

//             created_at: new Date().toLocaleString(),
//             updated_at: new Date().toLocaleString(),

//             permissions: {

//             }
//         })
//         await Role.save()

//         // create channel
//         var Channel = await DB.channels.create({
//             channel_id: Date.now() + Math.floor(Math.random() * 1000),
//             channel_name: channel_name,
//             channel_type: 0, // voice and text channel
//             members: [user_id],
//             members_count: 1,
//             updated_at: new Date().toLocaleString(),
//             created_at: new Date().toLocaleString(),
//             permission_id: Role.role_id
//         })
//         await Channel.save()
        
//         // add channel to user
//         User.channels.push(Channel.channel_id)
//         await User.save()
//     }
//     catch (err) {
//         res.json(
//             new RouteResponse()
//                 .setStatus(Status.error)
//                 .setMessage(err as string)
//         )
//         return
//     }
// }
