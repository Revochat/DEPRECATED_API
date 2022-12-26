import { FilterQuery, QueryOptions, QueryWithHelpers } from "mongoose"
import {IUser} from "./models/User"

export interface IDatabase {
    users: {
        create: (user: IUser) => Promise<IUser>
        exist: (query: FilterQuery<IUser>, options?: QueryOptions) => Promise<boolean>
        log: (user: IUser) => Promise<IUser>
        get: {
            one: (query: FilterQuery<IUser>, options?: QueryOptions) => Promise<null | QueryWithHelpers<any, any>>
            all: (query: FilterQuery<IUser>, options?: QueryOptions) => Promise<null | QueryWithHelpers<any, any>>
        }
        find: {
            username: (username: string) => Promise<null | QueryWithHelpers<any, any>>
            token: (token: string) => Promise<null | QueryWithHelpers<any, any>>
        },
        connect: ({username, password} : {username: string, password: string}) => Promise<boolean>
    }
}