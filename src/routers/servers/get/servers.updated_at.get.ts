import { RouteResponse, Status } from '../../controller';
import DB from '../../../database';
import express from 'express';
import UTILS from '../../../utils';

export const getUpdatedAt = async (req: express.Request, res: express.Response) => {
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
        var User = await UTILS.FUNCTIONS.FIND.USER.token(token)

        if (!Server) throw "Server not found"
        if (!User) throw "User not found"

        // Check if user is a member of the server
        if (!UTILS.FUNCTIONS.FIND.SERVER.member(User.user_id, Server)) throw "You are not a member of this server"

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setData(Server.updated_at)
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