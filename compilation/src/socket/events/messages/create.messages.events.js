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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCreateEvent = void 0;
const axios_1 = __importStar(require("axios"));
const __1 = __importDefault(require("../../"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../../utils");
dotenv_1.default.config();
class MessageCreateEvent {
    constructor(socket) {
        this.socket = socket;
    }
    run(channelID, message) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Use this to get socket id  
                __1.default.io.to(this.socket.id).emit("messageCreate", "Sending message in channel: " + channelID + " with message: " + message + "");
                const response = axios_1.default.post(`${process.env.BASE_URI}/api/v1/message/send/${channelID}`, {
                    message: message
                }, utils_1.utils.set.bearer(__1.default.users[this.socket.id].token)).then((response) => {
                    __1.default.io.to(channelID.toString()).emit("messageCreate", response.data.data);
                }).catch((err) => {
                    var _a;
                    __1.default.io.to(this.socket.id).emit("messageCreate", (_a = err.response) === null || _a === void 0 ? void 0 : _a.data);
                });
            }
            catch (err) {
                console.log("Error while sending message from: " + this.socket.id + " " + err);
                if (err instanceof axios_1.AxiosError)
                    __1.default.io.to(this.socket.id).emit("messageCreate", (_a = err.response) === null || _a === void 0 ? void 0 : _a.data);
                else
                    __1.default.io.to(this.socket.id).emit("messageCreate", "An error occured while sending message in channel: " + channelID.toString() + " with message: " + message + "");
            }
        });
    }
}
exports.MessageCreateEvent = MessageCreateEvent;
