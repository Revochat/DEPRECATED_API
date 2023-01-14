import mongoose, { Document, Schema } from "mongoose";
import { IChannelPermission } from "./Channel";

export interface IRolePermission {
    server: {
        manage: boolean; // manage server (edit name, icon, etc) and permissions

        member: {
            invite: boolean; // invite members
            remove: boolean; // remove members
            ban: boolean; // ban members
            manage: boolean; // manage members (roles, nicknames, etc)
        };

        roles: {
            manage: boolean; // manage roles
            give: boolean; // give roles
        };

        channels: {
            manage: boolean; // manage channels
            view: boolean; // view channels
            speak: boolean; // speak in voice channels
            video: boolean; // video in voice channels
            move: boolean; // move members in voice channels
        };

        messages: {
            send: boolean; // send messages
            delete: boolean; // delete messages
            mentions: boolean; // mention everyone, roles, users
            send_files: boolean; // send files
        };
    };
}

export interface IRole { // This is the interface for the role in the database

    role_id: number;
    role_name: string;
    role_members: string[];
    role_color: string;
    role_position: number;

    created_at: string;
    updated_at: string;

    permissions?: IChannelPermission;
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

    permissions: { type: Object, required: false, default: {} } // permissions for the role
});

export default mongoose.model<IRoleModel>("Role", RoleSchema);