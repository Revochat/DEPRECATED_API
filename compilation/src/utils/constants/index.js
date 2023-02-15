"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANTS = void 0;
const users_1 = require("./users");
const messages_1 = require("./messages");
const channels_1 = require("./channels");
const servers_1 = require("./servers");
const permissions_1 = require("./permissions");
const roles_1 = require("./roles");
const api_1 = require("./api");
const index_1 = require("./invites/index");
class CONSTANTS {
}
exports.CONSTANTS = CONSTANTS;
CONSTANTS.USER = users_1.USER_PROPERTIES;
CONSTANTS.MESSAGE = messages_1.MESSAGE_PROPERTIES;
CONSTANTS.CHANNEL = channels_1.CHANNEL_PROPERTIES;
CONSTANTS.SERVER = servers_1.SERVER_PROPERTIES;
CONSTANTS.ROLE = roles_1.ROLE_PROPERTIES;
CONSTANTS.INVITE = index_1.INVITES_PROPERTIES;
CONSTANTS.PERMISSIONS = permissions_1.PERMISSIONS;
CONSTANTS.API = api_1.API;
