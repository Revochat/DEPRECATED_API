import { FilterQuery, QueryOptions, QueryWithHelpers, Types } from "mongoose";
import User, {IUserModel, IUser } from "../models/User"
import Channel, {IChannel} from "../models/Channel";

export async function UserGetAllChannels(id: number) { // Get all channels a user is in by user id
    return Channel.find({members: id}) // Find all channels where the user id is in the members array
}

export async function UserGetMany(array_id: number[]): Promise<((IUserModel & {_id: Types.ObjectId})[]) | null> {
    return new Promise((resolve, reject) => {
        User.find({user_id: {$in: array_id}}, null, (err, users) => {
            if(err) resolve(null)
            resolve(users);
        })
    })
}

export async function UserGetOne(query: FilterQuery<IUserModel>, options: QueryOptions<unknown> | null = {projection: {_id: 0}}): Promise<null | QueryWithHelpers<any, any>> {
    return new Promise((resolve, reject) => {
        User.findOne(query, options, (err, user) => {
            if(err) reject(err);
            resolve(user);
        })
    })
}

export async function UserFindByUsername(username: string): Promise<null | QueryWithHelpers<any, any>> {
    return new Promise((resolve, reject) => {
        User.findOne({username}, null, (err, user) => {
            if(err) reject(err);
            resolve(user);
        })
    })
}

export async function UserFindByToken(token: string): Promise<null | QueryWithHelpers<any, any>> {
    return new Promise((resolve, reject) => {
        User.findOne({token}, null, (err, user) => {
            if(err) reject(err);
            resolve(user);
        })
    })
}

export async function UserFindByID(ID: number): Promise<(IUserModel & {_id: Types.ObjectId}) | null> {
    return new Promise((resolve, reject) => {
        User.findOne({user_id: ID}, null, (err, user) => {
            if(err) reject(err);
            resolve(user);
        })
    })
}