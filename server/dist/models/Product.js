"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    subcategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Subcategory' }],
    brand: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Brand' },
    fullPrice: { type: Number },
    currentPrice: { type: Number },
    description: { type: String },
    features: [{ type: String }],
    whatsIncluded: [{ type: String }],
    isFeatured: { type: Boolean },
    isOnSale: { type: Boolean },
    slug: { type: String, slug: 'name', unique: true },
    photos: [{ type: String, unique: true }],
});
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
