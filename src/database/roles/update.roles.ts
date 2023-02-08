import Role, {IRole} from "../models/Role";

export async function RoleUpdate(id: number, name: string, color: string, permissions: IRole["permissions"]) {
    return Role.findByIdAndUpdate(id, {
        role_name: name,
        permissions: permissions,
        color: color
    });
}