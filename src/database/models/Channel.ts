import mongoose, {Document, Schema} from "mongoose";
import {IRole, IRoleModel} from "./Role";
export interface IChannel { // This is the interface for the channel in the database
    server_id?: number;
    channel_id: number;
    owner_id: number;
    channel_name: string;
    channel_type: number;
    members: number[];
    members_count: number;
    updated_at: string;
    created_at: string;
}

export interface IChannelModel extends IChannel, Document, IRole {}

const ChannelSchema = new Schema({
    server_id: { type: Number, required: false, index: true },
    channel_id: { type: Number, required: true, unique: true, index: true },
    owner_id: { type: Number, required: true, index: true },
    channel_name: { type: String, required: true },
    channel_type: { type: Number, required: true}, // 0 = dm, 1 = group, 2 = server
    members: { type: Array, required: true, default: [] },
    members_count: { type: Number, required: true, default: 0 },
    updated_at: { type: String, required: true, default: Date.toLocaleString() },
    created_at: { type: String, required: true, default: Date.toLocaleString() },

    permission_id: {type: String, required: true, default: null}, // list of permissions_id to track permissions (for listing permissions more efficient and indexing them)
});

export default mongoose.model<IChannelModel>("Channel", ChannelSchema);