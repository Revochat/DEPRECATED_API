import mongoose, {Document, Schema} from "mongoose";

export interface IChannel { // This is the interface for the channel in the database
    server_id: number;
    channel_id: number;
    channel_name: string;
    updated_at: string;
    created_at: string;
}

export interface IChannelModel extends IChannel, Document {}

const ChannelSchema = new Schema({
    server_id: { type: Number, required: false, index: true },
    channel_id: { type: Number, required: true, unique: true, index: true },
    channel_name: { type: String, required: true },
    updated_at: { type: String, required: true, default: Date.toLocaleString() },
    created_at: { type: String, required: true, default: Date.toLocaleString() },
});

export default mongoose.model<IChannelModel>("Channel", ChannelSchema);