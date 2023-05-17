"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const mongoose_1 = require("mongoose");
const utilities_1 = require("../utilities");
const BrandSchema = new mongoose_1.Schema({
    name: { type: String },
    slug: { type: String, slug: 'name', unique: true },
});
BrandSchema
    .pre('validate', function (next) {
    if (this.name) {
        this.slug = (0, utilities_1.getUrlString)(this.name);
    }
    next();
});
exports.Brand = (0, mongoose_1.model)('Brand', BrandSchema);
