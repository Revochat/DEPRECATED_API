import Role, {IRole} from "../models/Role";
import Logger from "../../client/logger.client";

export async function RoleFindOne(role_id: number): Promise<IRole | null> {
    try {
        return await Role.findOne({role_id: role_id})
    } catch (err) {
        Logger.error(err);
        return null;
    }
}

export async function RolesFindServer(server_id: number): Promise<IRole[] | null> { // find all roles in a server by server id and return them
    try {
        return Role.find({role_server_id: server_id})
    } catch (err) {
        Logger.error(err);
        return null;
    }
}