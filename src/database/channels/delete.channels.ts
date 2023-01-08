import Channel from "../models/Channel";

export async function ChannelDelete() {
    return Channel.deleteMany();
}