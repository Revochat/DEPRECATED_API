import mongoose, { Document, Schema } from "mongoose";
export interface IRole { // This is the interface for the role in the database

    role_id: number;
    role_name: string;
    role_members: string[];
    role_color: string;
    role_position: number;

    created_at: string;
    updated_at: string;

    permissions: Object;
}

export interface IRoleModel extends IRole, Document {}

const RoleSchema = new Schema({
    role_id: { type: Number, required: true, unique: true, index: true },
    role_name: { type: String, required: true },
    role_members: { type: Array, required: false, default: [] },
    role_color: { type: String, required: true, default: "#000000" },
    role_position: { type: Number, required: true, default: 0 },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },

    permissions: {
        type: Object,
        required: true,
        default: {
            server: {
                manage: { type: Boolean, required: true, default: false }, // manage server (edit name, icon, etc)

                member: {
                    invite: { type: Boolean, required: true, default: false },
                    remove: { type: Boolean, required: true, default: false }, // kick from server
                    ban: { type: Boolean, required: true, default: false }, // ban from server
                    manage: { type: Boolean, required: true, default: false }, // mute, deafen, disconnect users
                },

                roles: {
                    manage: { type: Boolean, required: true, default: false }, // manage roles (create, edit, delete, etc)
                    give: { type: Boolean, required: true, default: false }, // give roles to users
                },

                channels: {
                    manage: { type: Boolean, required: true, default: false }, // manage channels (create, edit, delete, etc)
                    view: { type: Boolean, required: true, default: true }, // view channels
                    speak: { type: Boolean, required: true, default: true },
                    video: { type: Boolean, required: true, default: true },
                    move: { type: Boolean, required: true, default: false }, // move users between channels
                },
    
                messages: {
                    send: { type: Boolean, required: true, default: true },
                    delete: { type: Boolean, required: true, default: false },
                    // pin: { type: Boolean, required: true, default: true },
                    mentions: { type: Boolean, required: true, default: true },
                    send_file: { type: Boolean, required: true, default: true }
                }
            },
        }
    }
});

export default mongoose.model<IRoleModel>("IRole", RoleSchema);