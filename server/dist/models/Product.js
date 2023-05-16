"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' }],
    subcategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Subcategory' }],
    fullPrice: { type: Number },
    currentPrice: { type: Number },
    description: { type: String },
    features: [{ type: String }],
    whatsIncluded: [{ type: String }],
    isFeatured: [{ type: Boolean }],
    isOnSale: [{ type: Boolean }],
    slug: { type: String, slug: 'name', unique: true },
});
