"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subcategory = void 0;
const mongoose_1 = require("mongoose");
const utilities_1 = require("../utilities");
const SubcategorySchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    description: { type: String },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    slug: { type: String, slug: 'name', unique: true },
});
SubcategorySchema
    .pre('validate', function (next) {
    if (this.name) {
        this.slug = (0, utilities_1.getUrlString)(this.name);
    }
    next();
});
exports.Subcategory = (0, mongoose_1.model)('Subcategory', SubcategorySchema);
