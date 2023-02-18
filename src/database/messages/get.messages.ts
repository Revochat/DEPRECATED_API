import Message from "../models/Message";
import Logger from "../../client/logger.client";

export async function MessageFindOne(message_id: string) { // Find a message by message id
    try {
        return Message.findOne({message_id : message_id});
    } catch (err) {
        Logger.error(err);
    }
}

export async function MessageFindUser(user_id: string) { // Find all messages by user id
    try {
        return Message.find({user_id : user_id});
    } catch (err) {
        Logger.error(err);
    }
}

export async function MessageFindChannel(channel_id: string) { // Find all messages by channel id
    try {
        return Message.find({channel_id : channel_id});
    } catch (err) {
        Logger.error(err);
    }
}