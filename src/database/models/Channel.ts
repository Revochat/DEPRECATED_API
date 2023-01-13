import mongoose, {Document, Schema} from "mongoose";
import {IRole, IRoleModel} from "./Role";
export interface IChannel { // This is the interface for the channel in the database
    server_id?: number;
    channel_id: number;
    owner_id?: number;
    channel_name?: string;
    channel_type: number;
    members: number[];
    members_count: number;
    updated_at: string;
    created_at: string;

    permissions?: Object;
}

export interface IChannelPermission{
    manage: {
        roles_id: number[];
        user_id: number[];
    };
    view: {
        roles_id: number[];
        user_id: number[];
    };
    member: {
        invite: {
            roles_id: number[];
            user_id: number[];
        };
        remove: {
            roles_id: number[];
            user_id: number[];
        };
    },
    message: {
        send: {
            roles_id: number[];
            user_id: number[];
        };
        delete: {
            roles_id: number[];
            user_id: number[];
        };
        mentions: {
            roles_id: number[];
            user_id: number[];
        };

        send_files: {
            roles_id: number[];
            user_id: number[];
        };
    }
}

export interface IChannelModel extends IChannel, Document {}

const ChannelSchema = new Schema({
    server_id: {type: Number, required: false, index: true}, // server id if it's a server channel
    channel_id: { type: Number, required: true, unique: true, index: true },

    // if empty, it's a DM channel, if not empty and server_id is empty, it's a group channel, if not empty and server_id is not empty, it's a server channel
    owner_id: { type: Number, required: false, index: true }, 

    channel_name: { type: String, required: false },
    channel_type: { type: Number, required: true }, // 0 = HYBRID, 1 = TEXT, 2 = VOICE

    members: { type: Map, required: true, default: [] }, // map of user_id: roles_id
    members_count: { type: Number, required: true, default: 0 },
    updated_at: { type: String, required: true, default: new Date().toLocaleString() },
    created_at: { type: String, required: true, default: new Date().toLocaleString() },

    permissions: { // permissions for the channel
        type: Object,
        required: false,

        default: { // exceptions >> {roles_id: {role_id: true, ... }, user_id: {user_id: false, ... }}
            manage: { type: Map, required: true, default: {roles_id: {}, user_id: {}}}, // manage channel (edit title)
            view: { type: Map, required: true, default: {roles_id: {}, user_id: {}}}, // view channel

            member: {
                invite: { type: Map, required: true, default: {roles_id: {}, user_id: {}} },
                remove: { type: Map, required: true, default: {roles_id: {}, user_id: {}} }, // kick from channel
            },

            messages: {
                send: { type: Map, required: true, default: {roles_id: {}, user_id: {}} },
                delete: { type: Map, required: true, default: {roles_id: {}, user_id: {}} },
                // pin: { type: Map, required: true, default: {roles_id: {}, user_id: {}} },
                mentions: { type: Map, required: true, default: {roles_id: {}, user_id: {}} },
                send_file: { type: Map, required: true, default: {roles_id: {}, user_id: {}} }
            }
        }
    }
});

export default mongoose.model<IChannelModel>("Channel", ChannelSchema);