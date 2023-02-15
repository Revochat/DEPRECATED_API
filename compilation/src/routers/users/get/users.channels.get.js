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
exports.getChannels = void 0;
const database_1 = __importDefault(require("../../../database"));
const controller_1 = require("../../controller");
const utils_1 = __importDefault(require("../../../utils"));
const logger_client_1 = __importDefault(require("../../../client/logger.client"));
const getChannels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.token;
        logger_client_1.default.log("Getting user channels");
        // if token badly formatted
        if (!token || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH)
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        // fetch the user's channels from the database
        const channels = yield database_1.default.users.find.channels(User.user_id);
        for (let i = 0; i < channels.length; i++) {
            channels[i] = utils_1.default.FUNCTIONS.REMOVE_OVERFLOW_INFO_CHANNEL(channels[i]);
        }
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`User channels found`)
            .setData(channels));
    }
    catch (err) {
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.getChannels = getChannels;
