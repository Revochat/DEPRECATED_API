import { FilterQuery, QueryOptions, QueryWithHelpers } from "mongoose";
import User, {IUserModel, IUser } from "../models/User"

export async function UserExist(query: FilterQuery<IUserModel>, options: QueryOptions<unknown> | null = {projection: {_id: 1}}): Promise<boolean> {
    return new Promise((resolve) => {
        User.findOne(query, options, (err, user) => {
            if(err) resolve(false);
            user ? resolve(true) : resolve(false);
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

export async function UserGetAll(query: FilterQuery<IUserModel>, options: QueryOptions<unknown> | null = {projection: {_id: 0}}): Promise<null | QueryWithHelpers<any, any>> {
    return new Promise((resolve, reject) => {
        User.find(query, options, (err, user) => {
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