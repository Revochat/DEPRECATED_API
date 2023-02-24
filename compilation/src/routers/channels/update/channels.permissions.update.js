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
exports.updatePermissions = void 0;
const controller_1 = require("../../controller");
const emitter_client_1 = __importDefault(require("../../../client/emitter.client"));
const database_1 = __importDefault(require("../../../database"));
const utils_1 = __importDefault(require("../../../utils"));
const updatePermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { permissions } = req.body;
    const { channel_id } = req.params;
    const token = req.token;
    if (!channel_id || !token || channel_id.length < utils_1.default.CONSTANTS.CHANNEL.ID.MIN_LENGTH || channel_id.length > utils_1.default.CONSTANTS.CHANNEL.ID.MAX_LENGTH ||
        token.length < utils_1.default.CONSTANTS.USER.TOKEN.MIN_LENGTH || token.length > utils_1.default.CONSTANTS.USER.TOKEN.MAX_LENGTH)
        throw "Badly formatted";
    try {
        var User = yield database_1.default.users.find.token(token); // Find the user
        if (!User)
            throw "User not found"; // Check if the user exists
        var Channel = yield database_1.default.channels.find.id(parseInt(channel_id)); // Find the channel
        if (!Channel)
            throw "Channel not found"; // Check if the channel exists
        // check the integrity of permissions
        if (yield utils_1.default.FUNCTIONS.CHECK.CHANNEL.PERMISSIONS(User, Channel, permissions))
            throw "Badly formatted permissions";
        if (Channel.server_id) { // If the channel is a server channel = no permissions editing in private channels
            if (!utils_1.default.FUNCTIONS.CHECK.CHANNEL.PERMISSIONS(User, Channel, utils_1.default.CONSTANTS.CHANNEL.PERMISSIONS.ADMIN))
                throw "You do not have permission to update this channel";
        }
        Channel.permissions = permissions; // Update the channel permissions
        Channel.updated_at = Date.toLocaleString();
        yield Channel.save(); // Save the channel
        emitter_client_1.default.emit("updateChannel", Channel);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.success)
            .setMessage(`Channel updated`)
            .setData(Channel));
    }
    catch (err) {
        res.status(400);
        res.json(new controller_1.RouteResponse()
            .setStatus(controller_1.Status.error)
            .setMessage(err));
    }
});
exports.updatePermissions = updatePermissions;
