import Message, {IMessage} from "../models/Message";

export async function MessageCreate(message: IMessage) {
    return Message.create(message);
}

export async function MessageFindOne(message_id: string) {
    return Message.findOne({message_id : message_id});
}

export async function MessageDelete() {
    return Message.deleteMany();
}