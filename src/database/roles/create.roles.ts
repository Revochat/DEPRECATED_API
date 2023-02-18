import Role, {IRole} from "../models/Role";
import Logger from "../../client/logger.client";

export async function RoleCreate(role: IRole) {
    try {
        return Role.create(role);
    } catch(err) {
        Logger.error(err)
    }
}