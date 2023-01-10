import mongoose, { Document, Schema } from "mongoose";

export interface IRole { // This is the interface for the role in the database

    role_id: number;
    role_name: string;
    role_color: string;
    role_position: number;

    permissions: { // array of users id

            server: {
                manage: boolean; // manage server name, icon, description, etc..

                role: {
                    create: boolean; // create roles/permissions
                    manage: boolean; // manage member roles
                },

                member: {
                    manage: boolean; // mute, deafen, disconnect users
                    kick: boolean;
                    ban: boolean;
                },

                channel: {
                    create: boolean;
                    delete: boolean;
                    view: boolean; // view channel
                    interact: boolean; // can a user join the vocal channel or type in chat
                    speak: boolean; // can a user speak in vocal channel
                    video: boolean; // share video
                    move: boolean; // move channel to another category
                    manage: boolean; // manage channels name, who can view it..
                },
    
                message: {
                    send: boolean; 
                    delete: boolean;
                    // pin: boolean; // manage messages: pin, unpin
                    mentions: boolean; // mention everyone, here, roles
                    send_file: boolean;
                    // use commands..
                }

                // reactions: {
                //     add: boolean;
                //     remove: boolean;
                // }
            }
    }
}

export interface IRoleModel extends IRole, Document {}

const RoleSchema = new Schema({
    role_id: { type: Number, required: true, unique: true, index: true },
    role_name: { type: String, required: true },
    role_color: { type: String, required: true, default: "#000000" },
    role_position: { type: Number, required: true, default: 0 },

    permissions: {
        required: true,
        default: {
            server: {
                manage: { type: Boolean, required: true, default: false },

                roles: {
                    create: { type: Boolean, required: true, default: false },
                    manage: { type: Boolean, required: true, default: false },
                },

                member: {
                    manage: { type: Boolean, required: true, default: false },
                    kick: { type: Boolean, required: true, default: false },
                    ban: { type: Boolean, required: true, default: false },
                },

                channels: {
                    create: { type: Boolean, required: true, default: false },
                    delete: { type: Boolean, required: true, default: false },
                    view: { type: Boolean, required: true, default: true },
                    interact: { type: Boolean, required: true, default: true },
                    speak: { type: Boolean, required: true, default: true },
                    video: { type: Boolean, required: true, default: true },
                    move: { type: Boolean, required: true, default: false },
                    manage: { type: Boolean, required: true, default: false }
                },

                messages: {
                    send: { type: Boolean, required: true, default: true },
                    delete: { type: Boolean, required: true, default: false },
                    // pin: { type: Boolean, required: true, default: true },
                    mentions: { type: Boolean, required: true, default: true },
                    send_file: { type: Boolean, required: true, default: true }
                }
            }
        }
    }
});

export default mongoose.model<IRoleModel>("IRole", RoleSchema);