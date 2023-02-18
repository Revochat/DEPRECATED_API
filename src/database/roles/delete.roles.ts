import Role from "../models/Role";
import Logger from "../../client/logger.client";

export async function RoleDelete(id: number) {
    try {
        return Role.findByIdAndDelete(id);
    } catch (err) {
        Logger.error(err);
    }
}