"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    user_id: { type: Number, required: true, unique: true, index: true },
    token: { type: String, required: true, unique: true, index: true },
    discriminator: { type: String, required: true, index: true },
    wallet_token: { type: String, required: false, unique: true, index: true, sparse: true },
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    premium_expiration: { type: String, required: true, default: null },
    avatar: { type: String, data: Buffer, contentType: String, default: "default_img_01.png" },
    message_privacy: { type: String, required: true, default: "friends" },
    status: { type: String, required: true, default: "online" },
    updated_at: { type: String, required: true, default: new Date().toLocaleString() },
    created_at: { type: String, required: true, default: new Date().toLocaleString() },
    last_connection: { type: String, required: true, default: new Date().toLocaleString() },
    servers: { type: Array, required: false, default: [] },
    channels: { type: Array, required: false, default: [] },
    friends: { type: Array, required: false, default: [] },
    friends_requests_received: { type: Array, required: false, default: [] },
    friends_requests_sent: { type: Array, required: false, default: [] },
    blocked: { type: Array, required: false, default: [] }
});
exports.default = mongoose_1.default.model("User", UserSchema);
