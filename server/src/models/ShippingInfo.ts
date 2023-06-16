import { Schema, model } from "mongoose"

const ShippingInfoSchema = new Schema({
    email: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    company: {type: String, required: false },
    streetAddressOne: {type: String},
    streetAddressTwo: {type: String, required: false},
    streetAddressThree: {type: String, required: false},
    country: {type: String},
    city: {type: String},
    postcode: {type: String},
    phoneNumber: {type: String},
}, {
    timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' }
})

export const ShippingInfo = model('ShippingInfo', ShippingInfoSchema)
