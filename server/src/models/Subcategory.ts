import { Schema, model } from "mongoose"
import { getUrlString } from "../utilities"

const SubcategorySchema = new Schema({
    name: { type: String, unique: true },
    description: { type: String },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category'}],
    slug: { type: String, slug: 'name', unique: true },
    photo: { type: String, required: false },
})

SubcategorySchema
.pre('validate', function(next) {
    if (this.name) {
      this.slug = getUrlString(this.name)
    }
    next()
  })

export const Subcategory = model('Subcategory', SubcategorySchema) 