"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_client_1 = __importDefault(require("../../client/logger.client"));
module.exports = (command, args) => {
    if (args.length === 0)
        return logger_client_1.default.error("This command requires arguments");
    console.log(args[0]);
    switch (args[0]) {
        case "code":
            logger_client_1.default.normal("Executing code...");
            // Execue the string as code
            eval(args.slice(1).join(" "));
            break;
        default:
            logger_client_1.default.error("Invalid command");
            break;
    }
};
