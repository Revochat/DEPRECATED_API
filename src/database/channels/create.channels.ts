import Logger from "../../client/logger.client";
import Channel, {IChannel} from "../models/Channel";

export async function ChannelCreate(channel: IChannel) {
    try {
        return Channel.create(channel);
    } catch(err) {
        Logger.error(err);
    }
}