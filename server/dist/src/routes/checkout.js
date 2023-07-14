"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutRouter = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const controllers_1 = require("../controllers");
const checkoutRouter = (0, express_promise_router_1.default)();
exports.checkoutRouter = checkoutRouter;
checkoutRouter.post('/session', controllers_1.checkoutController.createSession);
