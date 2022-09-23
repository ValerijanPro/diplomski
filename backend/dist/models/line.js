"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Line = new Schema({
    x0: {
        type: Number
    },
    y0: {
        type: Number
    },
    x1: {
        type: Number
    },
    y1: {
        type: Number
    },
    love: {
        type: String
    },
    kind: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Line', Line, 'lines');
//# sourceMappingURL=line.js.map