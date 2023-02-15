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
exports.ChannelsGetEvent = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const __1 = __importDefault(require("../.."));
const database_1 = __importDefault(require("../../../database"));
const logger_client_1 = __importDefault(require("../../../client/logger.client"));
const utils_1 = __importDefault(require("../../../utils"));
dotenv_1.default.config();
class ChannelsGetEvent {
    constructor(socket) {
        this.socket = socket;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channels = __1.default.users[this.socket.id].channels;
                logger_client_1.default.debug(`Channels: ${channels}`);
                yield channels.forEach((channel) => __awaiter(this, void 0, void 0, function* () {
                    console.log(channel);
                    var members = yield database_1.default.users.find.many(channel.members);
                    if (!members)
                        return;
                    for (let i = 0; i < channel.members_count; i++) {
                        channel.members[i] = utils_1.default.FUNCTIONS.REMOVE_PRIVATE_INFO_USER(members[i]);
                    }
                }));
                __1.default.io.to(this.socket.id).emit("channelsGet", channels);
            }
            catch (err) {
                logger_client_1.default.error(err);
            }
        });
    }
}
exports.ChannelsGetEvent = ChannelsGetEvent;
