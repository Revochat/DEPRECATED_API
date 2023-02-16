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
exports.inviteCreate = void 0;
const controller_1 = require("../controller");
const emitter_client_1 = __importDefault(require("../../client/emitter.client"));
const logger_client_1 = __importDefault(require("../../client/logger.client"));
const database_1 = __importDefault(require("../../database"));
const utils_1 = __importDefault(require("../../utils"));
const inviteCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var { server_id } = req.params;
    const token = req.token;
    const { uses, expires_at } = req.body;
    logger_client_1.default.debug(`Creating invite for ${server_id}`);
    if (!server_id || !token || !uses || !expires_at ||
        server_id.length < utils_1.default.CONSTANTS.SERVER.ID.MIN_LENGTH || server_id.length > utils_1.default.CONSTANTS.SERVER.ID.MAX_LENGTH ||
        token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH || expires_at instanceof Date || uses instanceof Number) { //type check
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage("Badly formatted"));
        return;
    }
    try {
        if (expires_at < new Date().toLocaleString()) {
            throw "Invalid expiration date";
        }
        var User = yield database_1.default.users.find.token(token); // Find the user
        if (!User)
            throw "User not found";
        var Server = yield database_1.default.servers.find.id(parseInt(server_id)); // Find the server
        if (!Server)
            throw "Server not found";
        if (Server.owner_id !== User.user_id)
            throw "You are not the owner of this server";
        if (!utils_1.default.FUNCTIONS.PERMISSIONS.hasServerPermission(User, Server, utils_1.default.CONSTANTS.SERVER.PERMISSIONS.ADMIN))
            throw "You do not have permission to create invites";
        // create an invite for the server
        var Invite = yield database_1.default.invites.create({
            server_id: parseInt(server_id),
            invite_id: Date.now() + Math.floor(Math.random() * 1000),
            created_at: new Date().toLocaleString(),
            expires_at: new Date().toLocaleString(),
            uses: uses,
            inviter_id: parseInt(User.user_id)
        });
        // // add the invite to the server
        if (!Server.invite_ids)
            Server.invite_ids = [];
        if (!Invite)
            throw "Invite not found";
        Server.invite_ids.push(Invite.invite_id);
        yield Server.save();
        emitter_client_1.default.emit("createInvite", Invite);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage("Invite created")
            .setData({
            invite: Invite
        }));
    }
    catch (err) {
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.inviteCreate = inviteCreate;