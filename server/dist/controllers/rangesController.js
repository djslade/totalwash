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
exports.rangesController = void 0;
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
const utilities_1 = require("../utilities");
const getRange = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rangeId } = req.params;
        const range = yield models_1.Range.findOne({ slug: rangeId })
            .populate("parents")
            .exec();
        return res.status(200).send({ range });
    }
    catch (err) {
        return next(err);
    }
});
const getAllRanges = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { parent } = req.query;
        const query = {};
        if (parent) {
            query.parents = parent;
        }
        const ranges = yield models_1.Range.find(query).populate("parents").exec();
        return res.status(200).send({ ranges });
    }
    catch (err) {
        return next(err);
    }
});
const postRange = [
    (0, express_validator_1.body)("name").isString().notEmpty().trim(),
    (0, express_validator_1.body)("description").isString().notEmpty().trim(),
    (0, express_validator_1.body)("parents")
        .isArray()
        .custom((value) => (0, utilities_1.validateArrayOfObjectIds)(value)),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error("Validation error");
            }
            const { name, description, parents, } = req.body;
            parents.forEach((parent) => __awaiter(void 0, void 0, void 0, function* () {
                const parentInDatabase = yield models_1.Range.findById(parent);
                if (!parentInDatabase) {
                    throw new Error("Specified category was not in database");
                }
            }));
            const range = new models_1.Range({
                name,
                description,
                parents,
            });
            const newRange = yield range.save();
            return res.status(201).send({ range: newRange });
        }
        catch (err) {
            return next(err);
        }
    }),
];
const updateRange = [
    (0, express_validator_1.body)("name").isString().notEmpty().trim(),
    (0, express_validator_1.body)("description").isString().notEmpty().trim(),
    (0, express_validator_1.body)("parents")
        .isArray()
        .custom((value) => (0, utilities_1.validateArrayOfObjectIds)(value)),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error("Validation error");
            }
            const { name, description, parents, } = req.body;
            parents.forEach((parent) => __awaiter(void 0, void 0, void 0, function* () {
                const parentInDatabase = yield models_1.Range.findById(parent);
                if (!parentInDatabase) {
                    throw new Error("Specified category was not in database");
                }
            }));
            const { rangeId } = req.params;
            const range = yield models_1.Range.findOneAndUpdate({
                slug: rangeId,
            }, {
                name,
                description,
                parents,
            }, {
                new: true,
            }).exec();
            return res.status(200).send({ range });
        }
        catch (err) {
            return next(err);
        }
    }),
];
const deleteRange = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { RangeId } = req.params;
        yield models_1.Range.findOneAndDelete({ slug: RangeId });
        return res.status(200).send({ message: "Range was deleted" });
    }
    catch (err) {
        return next(err);
    }
});
exports.rangesController = {
    getRange,
    getAllRanges,
    postRange,
    updateRange,
    deleteRange,
};
