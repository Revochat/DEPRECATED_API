import Logger from "../../client/logger.client";
import Message, {IMessage} from "../models/Message";

export async function MessageCreate(message: IMessage) { // Create a message
    try {
        return Message.create(message);
    } catch(err) {
        Logger.error(err);
    }
}