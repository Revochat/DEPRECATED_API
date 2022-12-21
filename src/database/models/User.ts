import mongoose, {Document, Schema} from "mongoose";

export interface IUser { // This is the interface for the user in the database
    token: string;
    username: string;
    password: string;
    updated_at: string;
    created_at: string;
    last_connection: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema({
    token: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    updated_at: { type: String, required: true },
    created_at: { type: String, required: true },
    last_connection: { type: String, required: true },
});

export default mongoose.model<IUserModel>("User", UserSchema);