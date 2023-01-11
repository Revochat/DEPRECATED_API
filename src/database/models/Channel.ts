import mongoose, {Document, Schema} from "mongoose";
import {IRole, IRoleModel} from "./Role";
export interface IChannel { // This is the interface for the channel in the database
    server_id?: number;
    channel_id: number;
    owner_id?: number;
    channel_name: string;
    channel_type: number;
    channel_env: number;
    members: number[];
    members_count: number;
    updated_at: string;
    created_at: string;

    permission_id: number;
}

export interface IChannelModel extends IChannel, Document, IRole {}

const ChannelSchema = new Schema({
    server_id: {type: Number, required: false, index: true}, // server id if it's a server channel
    channel_id: { type: Number, required: true, unique: true, index: true },

    // if empty, it's a DM channel, if not empty and server_id is empty, it's a group channel, if not empty and server_id is not empty, it's a server channel
    owner_id: { type: Number, required: false, index: true }, 

    channel_name: { type: String, required: true },
    channel_type: { type: Number, required: true }, // 0 = HYBRID, 1 = TEXT, 2 = VOICE
    channel_env: {type: Number, required: true, default: 0}, // 0 = dm, 1 = group, 2 = server

    members: { type: Array, required: true, default: [] }, // array of user ids
    members_count: { type: Number, required: true, default: 0 },
    updated_at: { type: String, required: true, default: new Date().toLocaleString() },
    created_at: { type: String, required: true, default: new Date().toLocaleString() },

    permission_id: {type: Number, required: true}, // permission id for users in channel (in group basic perms, in server perms customisable)
});

export default mongoose.model<IChannelModel>("Channel", ChannelSchema);