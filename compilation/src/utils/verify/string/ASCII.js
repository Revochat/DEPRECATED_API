"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASCII = void 0;
const any_ascii_1 = __importDefault(require("any-ascii"));
function ASCII(str) {
    return (0, any_ascii_1.default)(str);
}
exports.ASCII = ASCII;
