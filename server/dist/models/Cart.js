"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }],
    discount: { type: Number },
}, {
    timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' }
});
exports.Cart = (0, mongoose_1.model)('Cart', CartSchema);
