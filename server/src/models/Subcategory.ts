import { Schema, model } from "mongoose"

const SubcategorySchema = new Schema({
    name: { type: String, unique: true },
    description: { type: String },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category'}],
    slug: { type: String, slug: 'name', unique: true },
})

export const Subcategory = model('Subcategory', SubcategorySchema) 