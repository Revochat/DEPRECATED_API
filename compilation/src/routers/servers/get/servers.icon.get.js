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
exports.getServerIcon = void 0;
const controller_1 = require("../../controller");
const utils_1 = __importDefault(require("../../../utils"));
const getServerIcon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { server_id } = req.params;
    const token = req.token;
    if (!token || !server_id || token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH ||
        server_id.length < utils_1.default.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > utils_1.default.CONSTANTS.SERVER.ID.MAX_LENGTH || isNaN(parseInt(server_id)))
        throw "Badly formatted";
    try {
        var Server = yield utils_1.default.FUNCTIONS.FIND.SERVER.id(parseInt(server_id));
        if (!Server)
            throw "Server not found";
        var User = yield utils_1.default.FUNCTIONS.FIND.USER.token(token);
        if (!User)
            throw "User not found";
        // Check if user is a member of the server
        if (!utils_1.default.FUNCTIONS.FIND.SERVER.member(User.user_id, Server))
            throw "You are not a member of this server";
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setData(Server.server_icon));
        return;
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
        return;
    }
});
exports.getServerIcon = getServerIcon;
