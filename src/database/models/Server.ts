import mongoose, { Document, Schema } from "mongoose";

export interface IServer { // This is the interface for the server in the database
    server_id: number;
    server_name: string;
    owner_id: string;
    channels: number[];
    members: string[];
    members_count: number;
    updated_at: string;
    created_at: string;

    permissions_id: string[];
}

export interface IServerModel extends IServer, Document {}

const ServerSchema = new Schema({
    server_id: { type: Number, required: true, unique: true, index: true },
    server_name: { type: String, required: true },
    owner_id: { type: String, required: true, index: true },
    channels: { type: Array, required: false, default: [] },
    members: { type: Map, required: false, default: {} }, // map of user_id: roles_id
    updated_at: { type: String, required: true, default: Date.toLocaleString() },
    created_at: { type: String, required: true, default: Date.toLocaleString() },

    permissions_id: { type: Array, required: false, default: [] } // permissions for the server
});

export default mongoose.model<IServerModel>("Server", ServerSchema);