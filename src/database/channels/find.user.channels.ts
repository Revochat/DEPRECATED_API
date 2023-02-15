import Logger from "../../client/logger.client";
import Channel from "../models/Channel";

export async function ChannelFindUser (user_id: number, channel_id: number) {
    try {
        return Channel.findOne({ where: { id: channel_id, user_id: user_id } }); // find the channel with the user id and channel id in the channel table
    } catch(err) {
        Logger.error(err);
    }  
}