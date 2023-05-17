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
exports.subcategoriesController = void 0;
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
const utilities_1 = require("../utilities");
const getSubcategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subcategoryId } = req.params;
        const subcategory = yield models_1.Subcategory.findOne({ slug: subcategoryId }).populate('categories').exec();
        return res.status(200).send({ subcategory });
    }
    catch (err) {
        return next(err);
    }
});
const getAllSubcategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.query;
        const query = {};
        if (category) {
            query.categories = category;
        }
        const subcategories = yield models_1.Subcategory.find({ query }).populate('categories').exec();
        return res.status(200).send({ subcategories });
    }
    catch (err) {
        return next(err);
    }
});
const postSubcategory = [
    (0, express_validator_1.body)('name').isString().notEmpty().trim(),
    (0, express_validator_1.body)('description').isString().notEmpty().trim(),
    (0, express_validator_1.body)('categories').isArray().custom((value) => (0, utilities_1.validateArrayOfObjectIds)(value)),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error('Validation error');
            }
            const { name, description, categories } = req.body;
            categories.forEach((category) => __awaiter(void 0, void 0, void 0, function* () {
                const categoryInDatabase = yield models_1.Category.findById(category);
                if (!categoryInDatabase) {
                    throw new Error('Specified category was not in database');
                }
            }));
            const subcategory = new models_1.Subcategory({
                name,
                description,
                categories,
            });
            const savedSubcategory = yield subcategory.save();
            return res.status(201).send({ subcategory: savedSubcategory });
        }
        catch (err) {
            return next(err);
        }
    })
];
const updateSubcategory = [
    (0, express_validator_1.body)('name').isString().notEmpty().trim(),
    (0, express_validator_1.body)('description').isString().notEmpty().trim(),
    (0, express_validator_1.body)('categories').isArray().custom((value) => (0, utilities_1.validateArrayOfObjectIds)(value)),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error('Validation error');
            }
            const { name, description, categories } = req.body;
            categories.forEach((category) => __awaiter(void 0, void 0, void 0, function* () {
                const categoryInDatabase = yield models_1.Category.findById(category);
                if (!categoryInDatabase) {
                    throw new Error('Specified category was not in database');
                }
            }));
            const { subcategoryId } = req.params;
            yield models_1.Subcategory.findOneAndUpdate({
                slug: subcategoryId,
            }, {
                name,
                description,
                categories,
            }).exec();
            return res.status(200).send({ message: 'Subcategory was updated' });
        }
        catch (err) {
            return next(err);
        }
    })
];
const deleteSubcategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subcategoryId } = req.params;
        yield models_1.Subcategory.findOneAndDelete({ slug: subcategoryId });
        return res.status(200).send({ message: 'Subcategory was deleted' });
    }
    catch (err) {
        return next(err);
    }
});
exports.subcategoriesController = {
    getSubcategory,
    getAllSubcategories,
    postSubcategory,
    updateSubcategory,
    deleteSubcategory,
};
