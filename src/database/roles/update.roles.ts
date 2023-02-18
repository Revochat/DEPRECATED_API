import Role, {IRole} from "../models/Role";
import Logger from "../../client/logger.client";

export async function RoleUpdate(id: number, name: string, color: string, permissions: IRole["permissions"]) {
    try {
        return Role.findByIdAndUpdate(id, {
            role_name: name,
            permissions: permissions,
            color: color
        });
    } catch(err) {
        Logger.error(err)
    }
}