"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const controllers_1 = require("../controllers");
const productsRouter = (0, express_promise_router_1.default)();
exports.productsRouter = productsRouter;
productsRouter.get('/:productId', controllers_1.productsController.getProduct);
productsRouter.get('/', controllers_1.productsController.getAllProducts);
productsRouter.post('/', controllers_1.productsController.postProduct);
productsRouter.put('/:productId', controllers_1.productsController.updateProduct);
productsRouter.delete('/:productId', controllers_1.productsController.deleteProduct);
