import Role, {IRole} from "../models/Role";

export async function RoleFindOne(role_id: number): Promise<IRole | null> {
    return await Role.findOne({role_id: role_id})
}