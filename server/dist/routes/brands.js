"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandsRouter = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const controllers_1 = require("../controllers");
const brandsRouter = (0, express_promise_router_1.default)();
exports.brandsRouter = brandsRouter;
brandsRouter.get('/:brandId', controllers_1.brandsController.getBrand);
brandsRouter.get('/', controllers_1.brandsController.getAllBrands);
brandsRouter.post('/', controllers_1.brandsController.postBrand);
brandsRouter.put('/:brandId', controllers_1.brandsController.updateBrand);
brandsRouter.delete('/:brandId', controllers_1.brandsController.deleteBrand);
