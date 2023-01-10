import mongoose, { Document, Schema } from "mongoose";

export interface IRole { // This is the interface for the role in the database

    role_id: number;
    role_name: string;
    role_color: string;

    permissions: { // array of users id
        channel: { // channel permissions
            create: boolean;
            delete: boolean;
            view: boolean; // view the channel
            access: boolean; // access to the channel: text or voice
            move: boolean; // move channel to another category
            manage: boolean; // manage channel name, who can view it 
        }
    
        message: {
            send: boolean; // send messages
            delete: boolean; // delete others messages
            pin: boolean; // pin, unpin
        }
    
        vocal: {
            speak: boolean; // speak
            video: boolean; // video
            manage: boolean; // mute, deafen, disconnect users
        }
    
        reaction: {
           add: boolean, // add reaction
           remove: boolean // remove others reactions
        }

        role: {
            create: boolean; // create a role
            delete: boolean; // delete roles (only inferior roles to the one who has access)
        }
    }
}

export interface IRoleModel extends IRole, Document {}

const RoleSchema = new Schema({
    role_id: { type: Number, required: true, unique: true, index: true },
    role_name: { type: String, required: true },

    permissions: { // array of users id
        channel: { // channel permissions
            create: { type: Boolean, required: true, default: false },
            delete: { type: Boolean, required: true, default: false },
            view: { type: Boolean, required: true, default: false }, // view channel
            move: { type: Boolean, required: true, default: false }, // move channel to another category
            manage: { type: Boolean, required: true, default: false }
        },

        message: {
            send: { type: Boolean, required: true, default: false },
            delete: { type: Boolean, required: true, default: false },
            manage: { type: Boolean, required: true, default: false },
        },

        vocal: {
            join: { type: Boolean, required: true, default: false },
            speak: { type: Boolean, required: true, default: false },
            video: { type: Boolean, required: true, default: false },
            manage: { type: Boolean, required: true, default: false },
        },

        reactions: {
            add: { type: Boolean, required: true, default: false },
            remove: { type: Boolean, required: true, default: false },
        },

        role: {
            create: { type: Boolean, required: true, default: false },
            delete: { type: Boolean, required: true, default: false },
        }
    }
});

export default mongoose.model<IRoleModel>("IRole", RoleSchema);