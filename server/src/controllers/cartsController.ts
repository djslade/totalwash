import { NextFunction, Request, Response } from "express"
import { Cart } from "../models"
import { body, validationResult } from "express-validator"
import { validateArrayOfObjectIds } from "../utilities"

const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cartId } =  req.params
        const cart = await Cart.findById(cartId).populate('products').exec()
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
            return res.status(200).send({ cart })
        } catch (err) {
            return next(err)
        }
    }
]

const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cartId } =  req.params
        await Cart.findByIdAndDelete(cartId)
        return res.status(200).send({ message: 'Cart was deleted' })
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