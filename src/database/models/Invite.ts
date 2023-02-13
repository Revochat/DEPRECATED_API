import mongoose, {Document, Schema} from "mongoose";

export interface IInvite {
    server_id: number;
    invite_id: number;
    created_at: string;
    expires_at: string;
    max_uses: number;
    uses: number;
    inviter_id: number;
}

export interface IInviteModel extends IInvite {}

const InviteSchema = new Schema({
    server_id: { type: Number, required: true, index: true },
    invite_id: { type: Number, required: true, unique: true, index: true },
    created_at: { type: String, required: true, default: Date.toLocaleString() },
    expires_at: { type: String, required: true, default: Date.toLocaleString() },
    max_uses: { type: Number, required: true },
    uses: { type: Number, required: true, default: 0 },
    inviter_id: { type: Number, required: true, index: true }
});

export default mongoose.model<IInviteModel>("Invite", InviteSchema);