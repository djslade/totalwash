import { Schema, model } from "mongoose"

const CartSchema = new Schema({
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    discount: { type: Number },
}, {
    timestamps: { createdAt: 'dateCreated', updatedAt: 'dateUpdated' }
})

export const Cart = model('Cart', CartSchema)
