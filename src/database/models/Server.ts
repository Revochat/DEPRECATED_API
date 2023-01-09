import mongoose, { Document, Schema } from "mongoose";

export interface IServer { // This is the interface for the server in the database
    server_id: number;
    server_name: string;
    owner_id: string;
    channels: string[];
    members_count: number;
    updated_at: string;
    created_at: string;
}

export interface IServerModel extends IServer, Document {}

const ServerSchema = new Schema({
    server_id: { type: Number, required: true, unique: true, index: true },
    server_name: { type: String, required: true },
    owner_id: { type: String, required: true, index: true },
    channels: { type: Array, required: false, default: [] },
    members_count: { type: Number, required: true, default: 0 },
    updated_at: { type: String, required: true, default: Date.toLocaleString() },
    created_at: { type: String, required: true, default: Date.toLocaleString() },

    // perm server: {
    //     edit: boolean, // edit server name, icon, etc
    //     manage: boolean // make roles
    //     invite: boolean // invite users
    // }

    // perm user: {
    //    kick: boolean,
    //    ban: boolean,
    //    timeout int,
    //    manage: boolean // attribute roles 
    // }

    // perm channel: { // array of channel permissions, this one is general and channel permissions override this one ?
    //     create: boolean, // array ..
    //     delete: boolean,
    //     edit: boolean,
    //     view: boolean,
    //     manage: boolean,
    //     move: boolean // move channel to another category
    // }

    // permission_id : { type: Number, required: true, default: 0 } ?
});

export default mongoose.model<IServerModel>("Server", ServerSchema);