import { NextFunction, Request, Response } from "express"
import { Cart } from "../models"
import { body, validationResult } from "express-validator"
import { validateArrayOfObjectIds } from "../utilities"
import { ShippingInfo } from "../models/ShippingInfo"

const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cartId } =  req.params
        const cart = await Cart.findById(cartId).populate('products').populate('shippingInfo').exec()
        return res.status(200).send({ cart })
    } catch (err) {
        return next(err)
    }
}

const createCart = [
    body('products').isArray().custom((value) => validateArrayOfObjectIds(value)),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error('Validation error')
            }
            const { products } = req.body
            const cart = new Cart({
                products,
                discount: 0,
            })
            const newCart = await cart.save()
            await newCart.populate('products')
            return res.status(200).send({ cart: newCart })
        } catch (err) {
            return next(err)
        }
    }
]

const updateCart = [
    body('discount').isNumeric(),
    body('products').isArray().custom((value) => validateArrayOfObjectIds(value)),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error('Validation error')
            }
            const { cartId } = req.params
            const { products, discount } = req.body
            
            const cart = await Cart.findByIdAndUpdate(
                cartId,
                {
                    products,
                    discount,
                },
                {
                    new: true
                }
            ).exec()
            await cart?.populate('products')
            return res.status(200).send({ cart })
        } catch (err) {
            return next(err)
        }
    }
]

const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cartId } =  req.params
        const cart = await Cart.findByIdAndDelete(cartId).populate('products').populate('shippingInfo').exec()
        if (cart && cart.shippingInfo) {
            await ShippingInfo.findByIdAndDelete(cart.shippingInfo._id).exec()
        }
        return res.status(200).send({ cart })
    } catch (err) {
        return next(err)
    }
}

export const cartsController = {
    getCart,
    createCart,
    updateCart,
    deleteCart,
}