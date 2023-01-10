import mongoose, { Document, Schema } from "mongoose";
import { boolean } from "webidl-conversions";

export interface IRole { // This is the interface for the role in the database

    server_id?: number;
    role_id: number;
    role_name: string;

    permissions: { // array of users id
        channel: { // channel permissions
            create: boolean;
            delete: boolean;
            edit: boolean;
            view: boolean; // view channel
            manage: boolean;
            move: boolean; // move channel to another category
        }
    
        message: {
            send: boolean;
            edit: boolean;
            delete: boolean;
            manage: boolean; // pin, unpin, etc
        }
    
        vocal: {
            join: boolean;
            speak: boolean;
            video: boolean;
            manage: boolean; // mute, deafen, etc
        }
    
        reaction: {
           add: boolean,
           remove: boolean
        }

        role: {
            create: boolean;
            delete: boolean;
        }
    }
}