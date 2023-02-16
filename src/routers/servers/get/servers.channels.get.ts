import { RouteResponse, Status } from '../../controller';
import DB from '../../../database';
import express from 'express';
import UTILS from '../../../utils';

export const getChannels = async (req: express.Request, res: express.Response) => {
    const {server_id} = req.params
    const token = req.token

    if (!token || !server_id || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
        server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH) { // type check 
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var Server = await UTILS.FUNCTIONS.FIND.SERVER.id(parseInt(server_id))
        if (!Server) throw "Server not found"

        if (!Server.channels) throw "No channels found"

        var User = await UTILS.FUNCTIONS.FIND.USER.token(token)
        if (!User) throw "User not found"

        // Check if user is a member of the server
        if (!UTILS.FUNCTIONS.FIND.SERVER.member(User.user_id, Server)) throw "You are not a member of this server"

        // Check if user has permission to view channels
        if (!UTILS.FUNCTIONS.CHECK.SERVER.PERMISSIONS(User, Server, UTILS.CONSTANTS.SERVER.PERMISSIONS.CHANNELS.VIEW)) throw "You do not have permission to view channels"    

        const ChannelsArray = []
        // fetch channels
        for (var i = 0; i < Server.channels.length; i++) {
            var Channel = await UTILS.FUNCTIONS.FIND.CHANNEL.id(Server.channels[i])
            if (!Channel) throw "Channel not found"
            ChannelsArray.push(Channel)
        }
        
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setData(ChannelsArray)
        )
        return 
    }
    catch (err) {
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
        return
    }

}