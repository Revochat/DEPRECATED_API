import Message from "../models/Message";
import Logger from "../../client/logger.client";

export async function MessageDelete() {
    try {
        return Message.deleteMany();
    } catch (err) {
        Logger.error(err);
    }
}