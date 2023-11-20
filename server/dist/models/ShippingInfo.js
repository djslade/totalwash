"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingInfo = void 0;
const mongoose_1 = require("mongoose");
const ShippingInfoSchema = new mongoose_1.Schema({
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    company: { type: String, required: false },
    streetAddressOne: { type: String },
    streetAddressTwo: { type: String, required: false },
    streetAddressThree: { type: String, required: false },
    country: { type: String },
    city: { type: String },
    postcode: { type: String },
    phoneNumber: { type: String },
}, {
    timestamps: { createdAt: "dateCreated", updatedAt: "dateUpdated" },
});
exports.ShippingInfo = (0, mongoose_1.model)("ShippingInfo", ShippingInfoSchema);
