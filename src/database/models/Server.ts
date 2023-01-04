import mongoose, { Document, Schema } from "mongoose";

export interface IServer { // This is the interface for the server in the database
    server_id: number;
    server_name: string;
    updated_at: string;
    created_at: string;
}

export interface IServerModel extends IServer, Document {}

const ServerSchema = new Schema({
    server_id: { type: Number, required: true, unique: true, index: true },
    server_name: { type: String, required: true },
    Channels: { type: Array, required: false, default: [] },
    updated_at: { type: String, required: true, default: Date.toLocaleString() },
    created_at: { type: String, required: true, default: Date.toLocaleString() },
});

export default mongoose.model<IServerModel>("Server", ServerSchema);