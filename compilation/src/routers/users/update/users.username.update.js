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
exports.usernameUpdate = void 0;
const database_1 = __importDefault(require("../../../database"));
const logger_client_1 = __importDefault(require("../../../client/logger.client"));
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const utils_1 = __importDefault(require("../../../utils"));
const usernameUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newusername } = req.params;
        const token = req.token;
        // if token or newusername badly formatted
        if (!token || !newusername || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
            newusername.length >= utils_1.default.CONSTANTS.USER.USERNAME.MAX_LENGTH || newusername.length < utils_1.default.CONSTANTS.USER.USERNAME.MIN_LENGTH)
            throw "Badly formatted";
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        User.username = newusername;
        User.updated_at = new Date().toLocaleString();
        User.save(); //update the username of the user in the database
        logger_client_1.default.debug(`User ${User} has been updated`);
        emitter_client_1.default.emit("updateUsername", User);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Username updated`)
            .setData(User));
    }
    catch (err) {
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.usernameUpdate = usernameUpdate;
