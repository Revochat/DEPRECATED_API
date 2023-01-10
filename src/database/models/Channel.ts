import mongoose, {Document, Schema} from "mongoose";
import {IRole, IRoleModel} from "./Role";
export interface IChannel { // This is the interface for the channel in the database
    channel_id: number;
    owner_id: number;
    channel_name: string;
    channel_type: number;
    members: number[];
    members_count: number;
    updated_at: string;
    created_at: string;

    permission_id: string;
}

export interface IChannelModel extends IChannel, Document, IRole {}

const ChannelSchema = new Schema({
    channel_id: { type: Number, required: true, unique: true, index: true },
    owner_id: { type: Number, required: true, index: true }, // owner id can be a server_id if it's a server channel or it can be a user_id if it is a group chat
    channel_name: { type: String, required: true },
    members: { type: Array, required: true, default: [] }, // array of user ids
    members_count: { type: Number, required: true, default: 0 },
    updated_at: { type: String, required: true, default: Date.toLocaleString() },
    created_at: { type: String, required: true, default: Date.toLocaleString() },

    permission_id: {type: String, required: true, default: null}, // permission id for users in channel (in group basic perms, in server perms customisable)
});

export default mongoose.model<IChannelModel>("Channel", ChannelSchema);