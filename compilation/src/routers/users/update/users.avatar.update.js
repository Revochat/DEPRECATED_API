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
exports.avatarUpdate = void 0;
const database_1 = __importDefault(require("../../../database"));
const logger_client_1 = __importDefault(require("../../../client/logger.client"));
const utils_1 = __importDefault(require("../../../utils"));
const avatarUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newavatar } = req.body;
    const token = req.token;
    // if token or newavatar badly formatted
    if (!token || !newavatar || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
        !utils_1.default.CONSTANTS.USER.PROFILE_PICTURE)
        throw "Badly formatted";
    // if user not found
    var User = yield database_1.default.users.find.token(token);
    if (!User)
        throw "User not found";
    // newavatar is a file
    logger_client_1.default.debug(`User ${User.username} has updated his avatar`);
});
exports.avatarUpdate = avatarUpdate;
