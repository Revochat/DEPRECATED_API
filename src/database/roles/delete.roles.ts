import Role from "../models/Role";

export async function RoleDelete(id: number) {
    return Role.findByIdAndDelete(id);
}