import { Schema, model } from "mongoose"

const CategorySchema = new Schema({
    name: { type: String, unique: true },
    description: { type: String },
    slug: { type: String, slug: 'name', unique: true },
})

export const Category = model('Category', CategorySchema)
