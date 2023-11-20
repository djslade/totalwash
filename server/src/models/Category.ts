import { Schema, model } from "mongoose";
import { getUrlString } from "../utilities";

const CategorySchema = new Schema({
  name: { type: String, unique: true },
  description: { type: String },
  slug: { type: String, slug: "name", unique: true },
  photo: { type: String, required: false },
});

CategorySchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = getUrlString(this.name);
  }
  next();
});

export const Category = model("Category", CategorySchema);
