import Logger from "../../client/logger.client";
import User, { IUserModel } from "../models/User";
import {UserFind} from "./find.users";
import bcrypt from 'bcrypt';

export async function UserConnect({username, password} : {username: string, password: string}): Promise<boolean> {
    try {
        const userFound = await UserFind({ username })
        if (userFound) {
            if (await bcrypt.compare(password, userFound.password)) {
                return true;
            }
        }
    } catch (error) {
        Logger.error(error)
    }
    return false;
}