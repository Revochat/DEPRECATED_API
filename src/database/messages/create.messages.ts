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

export async function MessageFindUser(user_id: string) {
    return Message.find({user_id : user_id});
}

export async function MessageFindChannel(channel_id: string) {
    return Message.find({channel_id : channel_id});
}