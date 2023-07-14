"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoriesRouter = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const controllers_1 = require("../controllers");
const subCategoriesRouter = (0, express_promise_router_1.default)();
exports.subCategoriesRouter = subCategoriesRouter;
subCategoriesRouter.get('/:subcategoryId', controllers_1.subcategoriesController.getSubcategory);
subCategoriesRouter.get('/', controllers_1.subcategoriesController.getAllSubcategories);
subCategoriesRouter.post('/', controllers_1.subcategoriesController.postSubcategory);
subCategoriesRouter.put('/:subcategoryId', controllers_1.subcategoriesController.updateSubcategory);
subCategoriesRouter.delete('/:subcategoryId', controllers_1.subcategoriesController.deleteSubcategory);
