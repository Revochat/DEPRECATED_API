"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_URI = process.env.BASE_URI;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
exports.config = {
    application: {
        name: "RevochatAPI",
        version: "1.2.0",
        description: "Revochat is a project that aims at providing a secure and decentralised way to communicate via private messages, group chat and servers.",
        owners: [
            "ByLife",
            "Thomas78125",
            "Lux",
        ],
    },
    properties: {
        port: 3000,
        readyEventTimeout: 500,
    },
    mongo: {
        username: MONGO_USERNAME,
        url: ((_a = process.env.MONGO_URL) === null || _a === void 0 ? void 0 : _a.replace("<USERNAME>", MONGO_USERNAME).replace("<PASSWORD>", MONGO_PASSWORD)),
    },
    api: {
        url: BASE_URI,
        version: "v1",
    },
};
