"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const brands_1 = require("./brands");
const categories_1 = require("./categories");
const products_1 = require("./products");
const subcategories_1 = require("./subcategories");
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const apiRouter = (0, express_promise_router_1.default)();
exports.apiRouter = apiRouter;
apiRouter.use('/brands', brands_1.brandsRouter);
apiRouter.use('/categories', categories_1.categoriesRouter);
apiRouter.use('/products', products_1.productsRouter);
apiRouter.use('/subcategories', subcategories_1.subCategoriesRouter);
