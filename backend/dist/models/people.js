"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let People = new Schema({
    id: {
        type: Number,
        required: true
    },
    broj: {
        type: Number
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    gender: {
        type: String
    },
    date_of_birth: {
        type: String
    },
    date_of_death: {
        type: String
    },
    place_of_birth: {
        type: String
    },
    picture: {
        type: String
    },
    profession: {
        type: String
    },
    other: {
        type: String
    },
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    r: {
        type: Number
    },
    highlighted: {
        type: String
    },
    children: {
        type: Array
    },
    partner: {
        type: Array
    },
    lines: {
        type: Array
    },
    owner: {
        type: String
    }
});
People.add({
    mother: [Object],
    father: [Object],
    next_sibling: [Object],
    prev_sibling: [Object]
});
exports.default = mongoose_1.default.model('People', People, 'people');
//# sourceMappingURL=people.js.map