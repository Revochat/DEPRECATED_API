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
exports.createRole = void 0;
const controller_1 = require("../controller");
const emitter_client_1 = __importDefault(require("../../client/emitter.client"));
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const database_1 = __importDefault(require("../../database"));
const utils_1 = __importDefault(require("../../utils"));
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { server_id } = req.params;
        const { name, color, position } = req.body;
        const permissions = req.body.permissions;
        const token = req.token;
        //type checking
        if (!token || !position || !name || !color || !permissions ||
            server_id.length < utils_1.default.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > utils_1.default.CONSTANTS.SERVER.ID.MAX_LENGTH ||
            token.length < utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH) { //type check
            res.json(new controller_1.RouteResponse()
                .setStatus(controller_1.Status.error)
                .setMessage("Badly formatted"));
            return;
        }
        var User = yield database_1.default.users.find.token(token);
        if (!User)
            throw "User not found";
        var Server = yield database_1.default.servers.find.id(parseInt(server_id));
        if (!Server)
            throw "Server not found";
        // // check that position is not already taken
        // var Role = await DB.roles.find.position(parseInt(server_id), position)
        // if (Role) throw "Position already taken"
        // // check that role name is not already taken
        // var Role = await DB.roles.find.name(parseInt(server_id), name)
        // if (Role) throw "Role name already taken"
        // // check that role color is valid hex color code
        // if (!UTILS.ROLES.isColorValid(color)) throw "Invalid color"
        // create role
        var Role = yield database_1.default.roles.create({
            role_id: Date.now() + Math.floor(Math.random() * 1000),
            role_name: name,
            role_color: color,
            role_members: [],
            role_position: position,
            role_server_id: parseInt(server_id),
            permissions: permissions,
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        });
        // add id to server roles
        Server.roles.push(Role.role_id);
        logger_client_1.default.debug(`Role ${Role} has been created`);
        emitter_client_1.default.emit("createRole", Role);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Role created`)
            .setData(Role));
    }
    catch (err) {
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.createRole = createRole;
