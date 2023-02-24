"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_client_1 = __importDefault(require("../../client/logger.client"));
module.exports = (command, args) => {
    let validArgs = {
        "lookup": [
            "id",
            "token"
        ],
        "kick": [
            "id",
            "token"
        ],
        "ban": [
            "id",
            "token"
        ],
        "unban": [
            "id",
            "token"
        ],
        "socket": [
            "user_id",
            "token",
            "socket_id"
        ]
    };
    if (args.length === 0)
        return logger_client_1.default.error("This command requires arguments" + validArgs);
    switch (args[0]) {
        case "socket":
            if (args.length < 2)
                return logger_client_1.default.error("Specify a user to lookup");
            switch (args[1]) {
                case "user_id":
                    break;
            }
            break;
        case "kick":
            if (args.length < 2)
                return logger_client_1.default.error("Specify a user to kick");
            break;
        case "ban":
            if (args.length < 2)
                return logger_client_1.default.error("Specify a user to ban");
            break;
        case "unban":
            if (args.length < 2)
                return logger_client_1.default.error("Specify a user to unban");
            break;
        default:
            logger_client_1.default.error("Invalid command");
            break;
    }
};
