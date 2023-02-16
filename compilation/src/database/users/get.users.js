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
exports.UserFindByID = exports.UserFindByToken = exports.UserFindByUsername = exports.UserGetOne = exports.UserGetMany = exports.UserGetAllChannels = void 0;
const User_1 = __importDefault(require("../models/User"));
const Channel_1 = __importDefault(require("../models/Channel"));
function UserGetAllChannels(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return Channel_1.default.find({ members: id }); // Find all channels where the user id is in the members array
    });
}
exports.UserGetAllChannels = UserGetAllChannels;
function UserGetMany(array_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            User_1.default.find({ user_id: { $in: array_id } }, null, (err, users) => {
                if (err)
                    resolve(null);
                resolve(users);
            });
        });
    });
}
exports.UserGetMany = UserGetMany;
function UserGetOne(query, options = { projection: { _id: 0 } }) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            User_1.default.findOne(query, options, (err, user) => {
                if (err)
                    reject(err);
                resolve(user);
            });
        });
    });
}
exports.UserGetOne = UserGetOne;
function UserFindByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            User_1.default.findOne({ username }, null, (err, user) => {
                if (err)
                    reject(err);
                resolve(user);
            });
        });
    });
}
exports.UserFindByUsername = UserFindByUsername;
function UserFindByToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            User_1.default.findOne({ token }, null, (err, user) => {
                if (err)
                    reject(err);
                resolve(user);
            });
        });
    });
}
exports.UserFindByToken = UserFindByToken;
function UserFindByID(ID) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            User_1.default.findOne({ user_id: ID }, null, (err, user) => {
                if (err)
                    reject(err);
                resolve(user);
            });
        });
    });
}
exports.UserFindByID = UserFindByID;