"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartsRouter = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const controllers_1 = require("../controllers");
const cartsRouter = (0, express_promise_router_1.default)();
exports.cartsRouter = cartsRouter;
cartsRouter.get('/:cartId', controllers_1.cartsController.getCart);
cartsRouter.post('/', controllers_1.cartsController.createCart);
cartsRouter.put('/:cartId', controllers_1.cartsController.updateCart);
cartsRouter.delete('/:cartId', controllers_1.cartsController.deleteCart);
