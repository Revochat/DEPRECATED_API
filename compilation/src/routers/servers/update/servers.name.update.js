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
exports.nameUpdate = void 0;
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const logger_client_1 = __importDefault(require("../../../client/logger.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const nameUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var { server_id, name } = req.params;
    const token = req.token;
    logger_client_1.default.debug(`Updating server name ${server_id}`);
    if (!server_id || !name || !token || server_id.length < utils_1.default.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > utils_1.default.CONSTANTS.SERVER.ID.MAX_LENGTH ||
        token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
        name.length < utils_1.default.CONSTANTS.SERVER.NAME.MIN_LENGTH || name.length > utils_1.default.CONSTANTS.SERVER.NAME.MAX_LENGTH) { //type check
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage("Badly formatted"));
        return;
    }
    try {
        var User = yield database_1.default.users.find.token(token); // Find the user
        if (!User)
            throw "User not found";
        var Server = yield database_1.default.servers.find.id(parseInt(server_id)); // Find the server
        if (!Server)
            throw "Server not found";
        if (Server.owner_id !== User.user_id)
            throw "You are not the owner of this server";
        if (!utils_1.default.FUNCTIONS.PERMISSIONS.hasServerPermission(User, Server, utils_1.default.CONSTANTS.SERVER.PERMISSIONS.ADMIN))
            throw "You do not have permission to change the server name";
        Server.server_name = name;
        yield Server.save();
        emitter_client_1.default.emit("updateServerName", Server);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage("Server name updated"));
    }
    catch (err) {
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.nameUpdate = nameUpdate;