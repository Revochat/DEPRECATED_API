import mongoose, {Document, Schema} from "mongoose";

export interface IUser { // This is the interface for the user in the database
    user_id: number;
    token: string;

    wallet_token?: string | null;
    username: string;
    password: string;
    profile_picture?: string;

    updated_at?: string;
    created_at?: string;
    last_connection?: string;

    servers?: number[];
    channels?: number[];
    friends?: number[];
    friends_requests?: number[];
    friends_requests_sent?: number[];
    blocked?: number[];
}

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema({
    user_id: { type: Number, required: true, unique: true, index: true },
    token: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    wallet_token: { type: String, unique: true, index: true, default: null, sparse: true },
    profile_picture: {type: String, data: Buffer, contentType: String, default: "default_img_01.png" },
    updated_at: { type: String, required: true, default: new Date().toLocaleString() },
    created_at: { type: String, required: true, default: new Date().toLocaleString() },
    last_connection: { type: String, required: true, default: new Date().toLocaleString() },
    servers: { type: Array, required: false, default: [] },
    channels: { type: Array, required: false, default: [] },
    friends: { type: Array, required: false, default: [] },
    friends_requests: { type: Array, required: false, default: [] },
    friends_requests_sent: { type: Array, required: false, default: [] },
    blocked: { type: Array, required: false, default: [] }
});

export default mongoose.model<IUserModel>("User", UserSchema);