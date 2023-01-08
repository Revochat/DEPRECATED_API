import Message from "../models/Message";

export async function MessageFindOne(message_id: string) {
    return Message.findOne({message_id : message_id});
}

export async function MessageFindUser(user_id: string) {
    return Message.find({user_id : user_id});
}

export async function MessageFindChannel(channel_id: string) {
    return Message.find({channel_id : channel_id});
}