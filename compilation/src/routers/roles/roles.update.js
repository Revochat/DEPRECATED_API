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
exports.updateRole = void 0;
const controller_1 = require("../controller");
const emitter_client_1 = __importDefault(require("../../client/emitter.client"));
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const database_1 = __importDefault(require("../../database"));
const utils_1 = __importDefault(require("../../utils"));
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role_id, name, color } = req.body;
        const permissions = req.body.permissions;
        const token = req.token;
        //type checking
        if (!token || !name || !role_id || !permissions || !color ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH) { //type check
            res.json(new controller_1.RouteResponse()
                .setStatus(controller_1.Status.error)
                .setMessage("Badly formatted"));
            return;
        }
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        var Role = yield database_1.default.roles.find.id(role_id);
        if (!Role)
            throw "Role not found";
        yield database_1.default.roles.update(role_id, name, color, permissions);
        logger_client_1.default.debug(`Role ${Role} has been updated`);
        emitter_client_1.default.emit("updateRole", Role);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Role updated`)
            .setData(Role));
    }
    catch (err) {
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.updateRole = updateRole;
