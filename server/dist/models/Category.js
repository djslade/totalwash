"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const utilities_1 = require("../utilities");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    description: { type: String },
    slug: { type: String, slug: "name", unique: true },
    photo: { type: String, required: false },
});
CategorySchema.pre("validate", function (next) {
    if (this.name) {
        this.slug = (0, utilities_1.getUrlString)(this.name);
    }
    next();
});
exports.Category = (0, mongoose_1.model)("Category", CategorySchema);
