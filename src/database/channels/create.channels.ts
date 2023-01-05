import Channel, {IChannel} from "../models/Channel";

export async function ChannelCreate(channel: IChannel) {
    return Channel.create(channel);
}

export async function ChannelFindOne(channel_id: string) {
    return Channel.findOne({channel_id : channel_id});
}

export async function ChannelDelete() {
    return Channel.deleteMany();
}

export async function GetXNumberofMessages(channel_id: string, number: number) { // Get the last X number of messages from a channel in last to first order
    return Channel.findOne({channel_id : channel_id}).sort({date: -1}).limit(number);
}