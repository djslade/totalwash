"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoryModel = void 0;
const mongoose_1 = require("mongoose");
const SubcategorySchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    description: { type: String },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    slug: { type: String, slug: 'name', unique: true },
});
exports.SubcategoryModel = (0, mongoose_1.model)('CategoryModel', SubcategorySchema);
