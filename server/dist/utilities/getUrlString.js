"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlString = void 0;
const slugify_1 = __importDefault(require("slugify"));
const getUrlString = (string) => {
    const options = {
        lower: true,
        strict: true,
    };
    return (0, slugify_1.default)(string, options);
};
exports.getUrlString = getUrlString;
