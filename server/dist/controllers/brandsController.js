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
exports.brandsController = void 0;
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
const getBrand = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { brandId } = req.params;
        const brand = yield models_1.Brand.findOne({ slug: brandId }).exec();
        return res.status(200).send({ brand });
    }
    catch (err) {
        return next(err);
    }
});
const getAllBrands = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brands = yield models_1.Brand.find().exec();
        return res.status(200).send({ brands });
    }
    catch (err) {
        return next(err);
    }
});
const postBrand = [
    (0, express_validator_1.body)('name').isString().notEmpty().trim(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error('Validation error');
            }
            const { name } = req.body;
            const brand = new models_1.Brand({
                name,
            });
            const savedBrand = yield brand.save();
            return res.status(201).send({ Brand: savedBrand });
        }
        catch (err) {
            return next(err);
        }
    })
];
const updateBrand = [
    (0, express_validator_1.body)('name').isString().notEmpty().trim(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error('Validation error');
            }
            const { name } = req.body;
            const { brandId } = req.params;
            yield models_1.Brand.findOneAndUpdate({
                slug: brandId,
            }, {
                name,
            }).exec();
            return res.status(201).send({ message: 'brand was updated' });
        }
        catch (err) {
            return next(err);
        }
    })
];
const deleteBrand = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { brandId } = req.params;
        yield models_1.Brand.findOneAndDelete({ slug: brandId });
        return res.status(200).send({ message: 'Brand was deleted' });
    }
    catch (err) {
        return next(err);
    }
});
exports.brandsController = {
    getBrand,
    getAllBrands,
    postBrand,
    updateBrand,
    deleteBrand,
};
