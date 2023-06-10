"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartsController = void 0;
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
const utilities_1 = require("../utilities");
const getCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId } = req.params;
        const cart = yield models_1.Cart.findById(cartId).populate('products').exec();
        return res.status(200).send({ cart });
    }
    catch (err) {
        return next(err);
    }
});
const createCart = [
    (0, express_validator_1.body)('products').isArray().custom((value) => (0, utilities_1.validateArrayOfObjectIds)(value)),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error('Validation error');
            }
            const { products } = req.body;
            const cart = new models_1.Cart({
                products,
                discount: 0,
            });
            const newCart = yield cart.save();
            yield newCart.populate('products');
            return res.status(200).send({ cart: newCart });
        }
        catch (err) {
            return next(err);
        }
    })
];
const updateCart = [
    (0, express_validator_1.body)('discount').isNumeric(),
    (0, express_validator_1.body)('products').isArray().custom((value) => (0, utilities_1.validateArrayOfObjectIds)(value)),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error('Validation error');
            }
            const { cartId } = req.params;
            const { products, discount } = req.body;
            const cart = yield models_1.Cart.findByIdAndUpdate(cartId, {
                products,
                discount,
            }, {
                new: true
            }).exec();
            yield (cart === null || cart === void 0 ? void 0 : cart.populate('products'));
            return res.status(200).send({ cart });
        }
        catch (err) {
            return next(err);
        }
    })
];
const deleteCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId } = req.params;
        yield models_1.Cart.findByIdAndDelete(cartId);
        return res.status(200).send({ message: 'Cart was deleted' });
    }
    catch (err) {
        return next(err);
    }
});
exports.cartsController = {
    getCart,
    createCart,
    updateCart,
    deleteCart,
};
