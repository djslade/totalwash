"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = void 0;
const mongoose_1 = require("mongoose");
const utilities_1 = require("../utilities");
const RangeSchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    description: { type: String },
    parents: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Range', required: false }],
    slug: { type: String, slug: 'name', unique: true },
    photo: { type: String, required: false },
});
RangeSchema
    .pre('validate', function (next) {
    if (this.name) {
        this.slug = (0, utilities_1.getUrlString)(this.name);
    }
    next();
});
exports.Range = (0, mongoose_1.model)('Range', RangeSchema);
