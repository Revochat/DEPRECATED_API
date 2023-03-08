import { Request, Response } from 'express';
import { RouteResponse, Status } from '../../controller';
import DB from '../../../database';
import { IServerModel } from '../../../database/models/Server';
import { IUserModel } from '../../../database/models/User';
import UTILS from '../../../utils';
import express from 'express';

export const getPermissions = async (req: express.Request, res: express.Response) => { // get the permissions of a user in a server
    const { server_id } = req.params
    const token = req.token

    // type check
    if (!token || !server_id || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
        server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH || isNaN(parseInt(server_id))) throw "Badly formatted"

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
                .setData(Server.members)
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