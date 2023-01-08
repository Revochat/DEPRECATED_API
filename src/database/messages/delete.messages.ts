import Message from "../models/Message";

export async function MessageDelete() {
    return Message.deleteMany();
}