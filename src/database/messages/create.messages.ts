import Message, {IMessage} from "../models/Message";

export async function MessageCreate(message: IMessage) {
    return Message.create(message);
}