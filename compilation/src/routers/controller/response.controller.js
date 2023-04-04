"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intercept = void 0;
const errors_1 = require("../errors/");
const users_1 = require("../users");
const channels_1 = require("../channels");
const servers_1 = require("../servers");
const messages_1 = require("../messages");
const roles_1 = require("../roles");
const invites_1 = require("../invites");
exports.Intercept = {
    ROOT: {
        path: "/",
        API: {
            path: "api",
            V1: {
                path: "/v1",
                Users: users_1.UserRouter,
                Channels: channels_1.ChannelsRouter,
                Servers: servers_1.ServersRouter,
                Messages: messages_1.MessagesRouter,
                Roles: roles_1.RolesRouter,
                Invites: invites_1.InvitesRouter
            },
        },
        // ERROR HANDLER OF WRONG ROUTES // PATH * ALWAYS AT THE END OF THE ROUTER OBJECT 
        Errors: {
            path: "*",
            E404: errors_1.ErrorRouter
        }
    }
};
