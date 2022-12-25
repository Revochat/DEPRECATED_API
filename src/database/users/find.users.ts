import { FilterQuery, QueryOptions } from "mongoose";
import User, {IUserModel } from "../models/User"

export async function UserFind(query: FilterQuery<IUserModel>, options: QueryOptions = {lean : true}) {
    return User.findOne(query, null, options);
}