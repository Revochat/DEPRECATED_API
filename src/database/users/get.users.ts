import { FilterQuery, QueryOptions, QueryWithHelpers, Types } from "mongoose";
import User, {IUserModel} from "../models/User"
import Channel from "../models/Channel";

export async function UserGetAllChannels(id: number) { // Get all channels a user is in by user id
    try {
        return Channel.find({members: id}) // Find all channels where the user id is in the members array
    } catch (err) {
        return null;
    }
}

export async function UserGetMany(array_id: number[]): Promise<((IUserModel & {_id: Types.ObjectId})[]) | null> {
    try {
        return User.find({user_id: {$in: array_id}})
    } catch(err) {
        return null;
    }
}

export async function UserGetOne(query: FilterQuery<IUserModel>, options: QueryOptions<unknown> | null = {projection: {_id: 0}}): Promise<null | QueryWithHelpers<any, any>> {
    try {
        return User.findOne(query, options)
    } catch (err) {
        return null;
    }
}

export async function UserFindByUsername(username: string): Promise<null | QueryWithHelpers<any, any>> {
    try {
        return User.findOne({username})
    } catch (err) {
        return null;
    }
}

export async function UserFindByToken(token: string): Promise<null | QueryWithHelpers<any, any>> {
    try {
        return User.findOne({token})
    } catch (err) {
        return null;
    }
}

export async function UserFindByID(ID: number): Promise<(IUserModel) | null> {
    try {
        return User.findOne({user_id: ID})
    } catch (err) {
        return null;
    }
}