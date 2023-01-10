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

    permissions: { // permissions of channel
        required: false,
        default: {
            channels: {
                create: { type: Boolean, required: true, default: false },
                delete: { type: Boolean, required: true, default: false },
                view: { type: Boolean, required: true, default: true },
                interact: { type: Boolean, required: true, default: true },
                speak: { type: Boolean, required: true, default: true },
                video: { type: Boolean, required: true, default: true },
                move: { type: Boolean, required: true, default: false },
                manage: { type: Boolean, required: true, default: false }
            },

            messages: {
                send: { type: Boolean, required: true, default: true },
                delete: { type: Boolean, required: true, default: false },
                // pin: { type: Boolean, required: true, default: true },
                mentions: { type: Boolean, required: true, default: true },
                send_file: { type: Boolean, required: true, default: true }
            }
        }
    }
});

export default mongoose.model<IChannelModel>("Channel", ChannelSchema);