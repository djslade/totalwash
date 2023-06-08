import { Schema, model } from "mongoose"
import { getUrlString } from "../utilities"

const RangeSchema = new Schema({
    name: { type: String, unique: true },
    description: { type: String },
    parents: [{ type: Schema.Types.ObjectId, ref: 'Range', required: false }],
    slug: { type: String, slug: 'name', unique: true },
    photo: { type: String, required: false },
})

RangeSchema
.pre('validate', function(next) {
    if (this.name) {
      this.slug = getUrlString(this.name)
    }
    next()
  })

export const Range = model('Range', RangeSchema)
