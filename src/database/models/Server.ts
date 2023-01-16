import mongoose, { Schema } from "mongoose";

export interface IServer { // This is the interface for the server in the database
    server_id: number;
    server_name: string;
    owner_id: string;
    channels?: number[];
    members: Map<number, number[]>; // map of user_id: roles_id
    members_count: number;
    updated_at: string;
    created_at: string;

    permissions_id: number[];
}

export interface IServerModel extends IServer {} // dont need to extend Document because we're not using mongoose

const ServerSchema = new Schema({
    server_id: { type: Number, required: true, unique: true, index: true },
    server_name: { type: String, required: true },
    owner_id: { type: String, required: true, index: true },
    channels: { type: Array, required: false, default: [] },
    members: { type: Map, required: true, default: {} }, // map of user_id: roles_id
    members_count: { type: Number, required: true, default: 0 },
    updated_at: { type: String, required: true, default: new Date().toLocaleString() },
    created_at: { type: String, required: true, default: new Date().toLocaleString() },

    permissions_id: { type: Array, required: true, default: [] } // permissions for the server
});

export default mongoose.model<IServerModel>("Server", ServerSchema);