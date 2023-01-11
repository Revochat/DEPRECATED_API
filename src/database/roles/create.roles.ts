import Role, {IRole} from "../models/Role";

export async function RoleCreate(role: IRole) {
    return Role.create(role);
}