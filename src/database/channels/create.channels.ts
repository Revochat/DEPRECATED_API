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