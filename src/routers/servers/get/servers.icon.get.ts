import { RouteResponse, Status } from '../../controller';
import DB from '../../../database';
import express from 'express';
import UTILS from '../../../utils';

export const getServerIcon = async (req: express.Request, res: express.Response) => {
    try {
        const {server_id} = req.params
        const token = req.token
    
        if (!token || !server_id || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH || isNaN(parseInt(server_id))) throw "Badly formatted"
    
        var Server = await UTILS.FUNCTIONS.FIND.SERVER.id(parseInt(server_id))
        if (!Server) throw "Server not found"

        var User = await UTILS.FUNCTIONS.FIND.USER.token(token)
        if (!User) throw "User not found"

        // Check if user is a member of the server
        if (!UTILS.FUNCTIONS.FIND.SERVER.member(User.user_id, Server)) throw "You are not a member of this server"

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setData(Server.server_icon)
        )
        return 
    }
    
    catch (err) {
        res.status(400)
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage(err as string)
        )
        return
    }

}