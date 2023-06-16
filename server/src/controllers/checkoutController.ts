import { NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"
import { isValidObjectId } from "mongoose"
import { Cart } from "../models"
import Stripe from "stripe"
import { ShippingInfo } from "../models/ShippingInfo"

const createSession = [
    body('cart').custom((value) => isValidObjectId(value)),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error('Validation error')
            }
            const stripe = new Stripe(process.env.STRIPE_API_KEY || '', { apiVersion: '2022-11-15'})
            const {
                cart,
                email,
                firstName,
                lastName,
                company,
                streetAddressOne,
                streetAddressTwo,
                streetAddressThree,
                country,
                city,
                postcode,
                phoneNumber,
            } = req.body
            const newShippingInfo = new ShippingInfo({
                email,
                firstName,
                lastName,
                company,
                streetAddressOne,
                streetAddressTwo,
                streetAddressThree,
                country,
                city,
                postcode,
                phoneNumber
            })
            const savedInfo = await newShippingInfo.save()
            const checkoutCart = await Cart.findByIdAndUpdate(cart, {
                shippingInfo: savedInfo._id
            })
            .populate('products')
            .exec()
            if (!checkoutCart) return
            const getProcessedCartProducts = () => {
                const uniqueProducts = checkoutCart.products.reduce((accumulator, product) => {
                    if (!accumulator.find((item) => item._id === product._id)) {
                      accumulator.push(product)
                    }
                    return accumulator
                  }, [] as any[])
                const processedCartContents:any[] = uniqueProducts.map((product) => {
                    const quantity = checkoutCart.products.filter((otherProduct) => product._id === otherProduct._id).length
                    const subtotal = +parseFloat(`${product.currentPrice * quantity}`).toFixed(2)
                    const subtotalFull = +parseFloat(`${product.fullPrice * quantity}`).toFixed(2)
                    return {
                        product,
                        quantity,
                        subtotal,
                        subtotalFull,
                    }
                })
                return processedCartContents.sort((a, b) => a.name - b.name)
            }

            const lineItems = getProcessedCartProducts().map((cartItem) => {
                console.log(cartItem)
                console.log(cartItem.product.currentPrice * 100)
                return {
                    quantity: cartItem.quantity,
                    price_data: {
                        currency: 'gbp',
                        unit_amount: cartItem.product.currentPrice * 100,
                        product_data: {
                            name: cartItem.product.name,
                            images: [cartItem.product.photos[0]],
                        }
                    },
                }
            })
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                success_url: process.env.CLIENT_PATHNAME + `/checkout/complete/${cart}`,
                cancel_url: process.env.CLIENT_PATHNAME + `/checkout/cancelled/${cart}`,
                line_items: lineItems,
                mode: 'payment'
            })
            return res.json({ url: session.url })
        } catch (err) {
            return next(err)
        }
    }
]

export const checkoutController = {
    createSession
}