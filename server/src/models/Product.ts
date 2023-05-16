import { Schema, model } from "mongoose"

const ProductSchema = new Schema({
    name: { type: String, unique: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }],
    fullPrice: { type: Number },
    currentPrice: { type: Number },
    description: { type: String },
    features: [{ type: String }],
    whatsIncluded: [{ type: String }],
    isFeatured: [{ type: Boolean }],
    isOnSale: [{ type: Boolean }],
    slug: { type: String, slug: 'name', unique: true },
})
