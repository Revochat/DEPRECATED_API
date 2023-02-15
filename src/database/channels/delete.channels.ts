import Logger from "../../client/logger.client";
import Channel from "../models/Channel";

export async function ChannelDelete() {
    try {
        return Channel.deleteMany();
    } catch(err) {
        Logger.error(err);
    }
}