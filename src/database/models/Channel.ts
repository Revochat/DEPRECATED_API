import mongoose, {Document, Schema} from "mongoose";

export interface IChannel { // This is the interface for the channel in the database
    channel_id: number;
    channel_name: string;
    updated_at: string;
    created_at: string;
}