import { Types } from "mongoose";
import Logger from "../../client/logger.client";
import Channel, { IChannelModel } from "../models/Channel";
import Message from "../models/Message";

export async function ChannelFindOne(channel_id: number) {
    try {
        return Channel.findOne({channel_id : channel_id});
    } catch(err) {
        Logger.error(err);
    }
}

export async function GetXNumberofMessages(channel_id: string, number: number) { // Get the last X number of messages from a channel in last to first order from the message document
    try {
        return Message.find({channel_id : channel_id}).sort({date: -1}).limit(number);
    } catch(err) {
        Logger.error(err);
    }
}

export async function ChannelGetMany(array_id: number[]): Promise<(IChannelModel & {_id: Types.ObjectId})[]> {
    return new Promise((resolve, reject) => {
        Channel.find({channel_id: {$in: array_id}}, null, (err, channels) => {
            if(err) reject(err);
            resolve(channels);
        })
    })
}