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
exports.categoriesController = void 0;
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const category = yield models_1.Category.findOne({ slug: categoryId }).exec();
        return res.status(200).send({ category });
    }
    catch (err) {
        return next(err);
    }
});
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield models_1.Category.find().exec();
        return res.status(200).send({ categories });
    }
    catch (err) {
        return next(err);
    }
});
const postCategory = [
    (0, express_validator_1.body)("name").isString().notEmpty().trim(),
    (0, express_validator_1.body)("description").isString().notEmpty().trim(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error("Validation error");
            }
            const { name, description } = req.body;
            const category = new models_1.Category({
                name,
                description,
            });
            const savedCategory = yield category.save();
            return res.status(201).send({ category: savedCategory });
        }
        catch (err) {
            return next(err);
        }
    }),
];
const updateCategory = [
    (0, express_validator_1.body)("name").isString().notEmpty().trim(),
    (0, express_validator_1.body)("description").isString().notEmpty().trim(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error("Validation error");
            }
            const { name, description } = req.body;
            const { categoryId } = req.params;
            yield models_1.Category.findOneAndUpdate({
                slug: categoryId,
            }, {
                name,
                description,
            }).exec();
            return res.status(201).send({ message: "Category was updated" });
        }
        catch (err) {
            return next(err);
        }
    }),
];
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        yield models_1.Category.findOneAndDelete({ slug: categoryId });
        return res.status(200).send({ message: "Category was deleted" });
    }
    catch (err) {
        return next(err);
    }
});
exports.categoriesController = {
    getCategory,
    getAllCategories,
    postCategory,
    updateCategory,
    deleteCategory,
};
