import { FilterQuery, QueryOptions } from "mongoose"
import {IUser} from "./models/User"

export interface IDatabase {
    users: {
        create: (user: IUser) => Promise<IUser>
        find: (query: FilterQuery<IUser>, options: QueryOptions) => Promise<IUser>
        log: (user: IUser) => Promise<IUser>
    }
}