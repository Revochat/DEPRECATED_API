import { Request, Response } from 'express';
import { RouteResponse, Status } from '../../controller';
import DB from '../../../database';
import { IServerModel } from '../../../database/models/Server';
import { IUserModel } from '../../../database/models/User';
import UTILS from '../../../utils';
import express from 'express';

export const getPermissions = async (req: express.Request, res: express.Response) => { // get the roles of a server
    const { server_id } = req.params
    const token = req.token

    // type check
    if (!token || !server_id || token.length < UTILS.CONSTANTS.USER.TOKEN.MIN_TOKEN_LENGTH || token.length > UTILS.CONSTANTS.USER.TOKEN.MAX_TOKEN_LENGTH ||
        server_id.length < UTILS.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > UTILS.CONSTANTS.SERVER.ID.MAX_LENGTH) {
        res.json(
            new RouteResponse()
                .setStatus(Status.error)
                .setMessage("Badly formatted")
        )
        return
    }

    try {
        var Server = await UTILS.FUNCTIONS.find.server(parseInt(server_id))
        var User = await UTILS.FUNCTIONS.find.user.token(token)

        if (!Server) throw "Server not found"
        if (!User) throw "User not found"

        if (!Server.members.has(User.id)) throw "User not a member of server"

        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setData(Server.permissions_id)
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