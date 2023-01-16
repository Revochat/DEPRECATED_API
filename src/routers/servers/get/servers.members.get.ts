import { Request, Response } from 'express';
import { RouteResponse, Status } from '../../controller';
import DB from '../../../database';
import { IServerModel } from '../../../database/models/Server';
import { IUserModel } from '../../../database/models/User';
import UTILS from '../../../utils';

export const getMembers = async (req: Request, res: Response) => {
    const server_id = req.params.server_id;
    const user_id = req.params.user_id;

    // Check if server exists and if user is a member of the server 

    try {
        var Server = await UTILS.FUNCTIONS.find.server(parseInt(server_id))
        var User = await UTILS.FUNCTIONS.find.user(user_id)

        if (!Server.members.includes(User.user_id)) throw "You are not a member of this server"

        // Get members of server and send to client 

        var Members: IUserModel[] = []

        // Get members of server 

        for (var i = 0; i < Server.members.length; i++) {
            var Member = await UTILS.FUNCTIONS.find.user(Server.members[i])
            Members.push(Member)
        }

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