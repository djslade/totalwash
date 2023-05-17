"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const controllers_1 = require("../controllers");
const categoriesRouter = (0, express_promise_router_1.default)();
exports.categoriesRouter = categoriesRouter;
categoriesRouter.get('/:categoryId', controllers_1.categoriesController.getCategory);
categoriesRouter.get('/', controllers_1.categoriesController.getAllCategories);
categoriesRouter.post('/', controllers_1.categoriesController.postCategory);
categoriesRouter.put('/:categoryId', controllers_1.categoriesController.updateCategory);
categoriesRouter.delete('/:categoryId', controllers_1.categoriesController.deleteCategory);
