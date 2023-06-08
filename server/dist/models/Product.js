"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const utilities_1 = require("../utilities");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    subcategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Subcategory' }],
    ranges: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Range', required: false }],
    fullPrice: { type: Number },
    currentPrice: { type: Number },
    description: [{ type: String }],
    features: [{ type: String }],
    whatsIncluded: [{ type: String }],
    isFeatured: { type: Boolean },
    isOnSale: { type: Boolean },
    slug: { type: String, slug: 'name', unique: true },
    photos: [{ type: String, unique: true }],
});
ProductSchema
    .pre('validate', function (next) {
    if (this.name) {
        this.slug = (0, utilities_1.getUrlString)(this.name);
    }
    next();
});
ProductSchema.index({
    name: "text",
    description: "text",
    features: "text",
    whatsIncluded: "text",
}, {
    weights: {
        name: 8,
        description: 5,
        features: 5,
        whatsIncluded: 1,
    }
});
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
