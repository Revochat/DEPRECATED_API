import Channel from "../models/Channel";

export async function ChannelFindUser (user_id: number, channel_id: number) {
    return Channel.findOne({ where: { id: channel_id, user_id: user_id } }); // find the channel with the user id and channel id in the channel table
}