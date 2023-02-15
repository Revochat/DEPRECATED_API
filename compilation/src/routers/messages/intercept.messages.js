"use strict";
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
exports.MessagesIntercept = void 0;
const controller_1 = require("../controller");
const emitter_client_1 = __importDefault(require("../../client/emitter.client"));
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const database_1 = __importDefault(require("../../database"));
const message_send_1 = require("./message.send");
const message_remove_1 = require("./message.remove");
exports.MessagesIntercept = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { message_id } = req.params;
            if (!message_id)
                throw "Message ID cannot be empty";
            var Message = yield database_1.default.messages.find.id(message_id);
            if (!Message)
                throw "Message not found";
            logger_client_1.default.debug(`Message ${Message} has been found`);
            emitter_client_1.default.emit("getMessage", Message);
            res.json(new controller_1.RouteResponse()
                .setStatus(controller_1.Status.success)
                .setMessage(`Message found`)
                .setData(Message));
        }
        catch (err) {
            res.json(new controller_1.RouteResponse()
                .setStatus(controller_1.Status.error)
                .setMessage(err));
        }
    }),
    send: message_send_1.send,
    remove: message_remove_1.remove
};
