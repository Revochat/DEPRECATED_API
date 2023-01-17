import { Request, Response } from 'express';
import { RouteResponse, Status } from '../../controller';
import DB from '../../../database';
import { IServerModel } from '../../../database/models/Server';
import { IUserModel } from '../../../database/models/User';
import UTILS from '../../../utils';

export const getMembers = async (req: Request, res: Response) => {
    const { server_id, token } = req.params

    // Check if server exists and if user is a member of the server 

    try {
        var Server = await UTILS.FUNCTIONS.find.server(parseInt(server_id))
        var User = await UTILS.FUNCTIONS.find.user.token(token)


        if (!Server) throw "Server not found"
        if (!User) throw "User not found"

        if (!Server.members) throw "Server has no members" // This should never happen but typescript doesn't know that 
        if (!Server.members.has(User.id)) throw "User not a member of server"

        // Get members of server and send to client 

        var Members: IUserModel[] = []

        // Get members of server 

        Server.members.forEach(async (value, key) => {
            var Member = await UTILS.FUNCTIONS.find.user.id(key)
            if (Member) Members.push(Member)
        })

        // Send members to client
        res.json(
            new RouteResponse()
                .setStatus(Status.success)
                .setData(Members)
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