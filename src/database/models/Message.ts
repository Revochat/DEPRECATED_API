import mongoose, {Document, Schema} from "mongoose";
import { IUser } from "./User";
import { IUserSanitized } from "./UserSanitized";

export interface IMessage { // This is the interface for the message in the database
    message_id: number;
    author: IUserSanitized;
    channel_id: number;
    message: string;
    created_at: string;
}

export interface IMessageModel extends IMessage, Document {}

const MessageSchema = new Schema({
    message_id: { type: Number, required: true, unique: true, index: true },
    author: { type: Object, required: true },
    channel_id: { type: Number, required: true, index: true },
    message: { type: String, required: true },
    created_at: { type: String, required: true, default: Date.toLocaleString() },
});

export default mongoose.model<IMessageModel>("Message", MessageSchema);