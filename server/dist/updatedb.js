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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
dotenv_1.default.config();
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(process.env.MONGO_URI || "");
const updatedb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parents = yield models_1.Category.find().exec();
        const parentsPromises = parents.map((parent) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, description, photo } = parent;
            const newRange = new models_1.Range({
                name,
                description,
                photo,
            });
            const savedRange = yield newRange.save();
            return {
                name,
                id: savedRange._id
            };
        }));
        const parentIds = yield Promise.all(parentsPromises);
        const subcategories = yield models_1.Subcategory.find().populate('categories').exec();
        const otherRanges = subcategories.map((subcategory) => {
            const { name, description, photo } = subcategory;
            const categories = subcategory.categories;
            const parents = categories.map((category) => {
                return parentIds.filter((id) => id.name === category.name)[0].id;
            });
            return {
                name,
                description,
                photo,
                parents,
            };
        });
        const rangesPromises = otherRanges.map((range) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, description, photo, parents } = range;
            const newRange = new models_1.Range({
                name,
                description,
                photo,
                parents
            });
            const savedRange = yield newRange.save();
            return {
                name,
                id: savedRange._id
            };
        }));
        const otherRangesIds = yield Promise.all(rangesPromises);
        const allRangeIds = [...parentIds, ...otherRangesIds];
        const products = yield models_1.Product.find().populate('categories').populate('subcategories').exec();
        products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
            const categoriesAndSubcategories = [...product.categories, ...product.subcategories];
            const ranges = categoriesAndSubcategories.map((item) => {
                return allRangeIds.filter((id) => id.name === item.name)[0].id;
            });
            const updatedProduct = yield models_1.Product.findByIdAndUpdate(product._id, {
                ranges
            });
        }));
    }
    catch (err) {
        console.log(err);
    }
    finally {
        console.log('all done');
    }
});
updatedb();
