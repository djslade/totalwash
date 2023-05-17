import { Schema, model } from "mongoose"

const BrandSchema = new Schema({
    name: { type: String },
    slug: { type: String, slug: 'name', unique: true },
})

export const Brand = model('Brand', BrandSchema)
