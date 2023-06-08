"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const categories_1 = require("./categories");
const products_1 = require("./products");
const subcategories_1 = require("./subcategories");
const ranges_1 = require("./ranges");
const carts_1 = require("./carts");
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const apiRouter = (0, express_promise_router_1.default)();
exports.apiRouter = apiRouter;
apiRouter.use('/categories', categories_1.categoriesRouter);
apiRouter.use('/products', products_1.productsRouter);
apiRouter.use('/subcategories', subcategories_1.subCategoriesRouter);
apiRouter.use('/ranges', ranges_1.rangesRouter);
apiRouter.use('/carts', carts_1.cartsRouter);
