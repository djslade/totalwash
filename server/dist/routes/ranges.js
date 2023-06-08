"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangesRouter = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const controllers_1 = require("../controllers");
const rangesRouter = (0, express_promise_router_1.default)();
exports.rangesRouter = rangesRouter;
rangesRouter.get('/:rangeId', controllers_1.rangesController.getRange);
rangesRouter.get('/', controllers_1.rangesController.getAllRanges);
rangesRouter.post('/', controllers_1.rangesController.postRange);
rangesRouter.put('/:rangeId', controllers_1.rangesController.updateRange);
rangesRouter.delete('/:rangeId', controllers_1.rangesController.deleteRange);
