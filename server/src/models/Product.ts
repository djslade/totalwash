import { Schema, model } from "mongoose"
import { getUrlString } from "../utilities"

const ProductSchema = new Schema({
    name: { type: String, unique: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }],
    fullPrice: { type: Number },
    currentPrice: { type: Number },
    description: [{ type: String }],
    features: [{ type: String }],
    whatsIncluded: [{ type: String }],
    isFeatured: { type: Boolean },
    isOnSale: { type: Boolean },
    slug: { type: String, slug: 'name', unique: true },
    photos: [{ type: String, unique: true }],
})

ProductSchema
.pre('validate', function(next) {
    if (this.name) {
      this.slug = getUrlString(this.name)
    }
    next()
  })

export const Product = model('Product', ProductSchema)
