import Channel, {IChannel} from "../models/Channel";

export async function ChannelCreate(channel: IChannel) {
    return Channel.create(channel);
}