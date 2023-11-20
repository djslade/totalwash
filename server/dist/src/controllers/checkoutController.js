"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutController = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const stripe_1 = __importDefault(require("stripe"));
const ShippingInfo_1 = require("../models/ShippingInfo");
const createSession = [
    (0, express_validator_1.body)("cart").custom((value) => (0, mongoose_1.isValidObjectId)(value)),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                throw new Error("Validation error");
            }
            const stripe = new stripe_1.default(process.env.STRIPE_API_KEY || "", {
                apiVersion: "2022-11-15",
            });
            const { cart, email, firstName, lastName, company, streetAddressOne, streetAddressTwo, streetAddressThree, country, city, postcode, phoneNumber, shippingInfoId, } = req.body;
            let checkoutCart = null;
            if (shippingInfoId) {
                ShippingInfo_1.ShippingInfo.findByIdAndUpdate(shippingInfoId, {
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
                });
                checkoutCart = yield models_1.Cart.findById(cart).populate("products").exec();
            }
            else {
                const newShippingInfo = new ShippingInfo_1.ShippingInfo({
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
                });
                const savedInfo = yield newShippingInfo.save();
                checkoutCart = yield models_1.Cart.findByIdAndUpdate(cart, {
                    shippingInfo: savedInfo._id,
                })
                    .populate("products")
                    .exec();
            }
            if (!checkoutCart)
                return;
            const getProcessedCartProducts = (cartProducts) => {
                const uniqueProducts = cartProducts.reduce((accumulator, product) => {
                    if (!accumulator.find((item) => item._id === product._id)) {
                        accumulator.push(product);
                    }
                    return accumulator;
                }, []);
                const processedCartContents = uniqueProducts.map((product) => {
                    const quantity = cartProducts.filter((otherProduct) => product._id === otherProduct._id).length;
                    const subtotal = +parseFloat(`${product.currentPrice * quantity}`).toFixed(2);
                    const subtotalFull = +parseFloat(`${product.fullPrice * quantity}`).toFixed(2);
                    return {
                        product,
                        quantity,
                        subtotal,
                        subtotalFull,
                    };
                });
                return processedCartContents.sort((a, b) => a.name - b.name);
            };
            const lineItems = getProcessedCartProducts(checkoutCart.products).map((cartItem) => {
                return {
                    quantity: cartItem.quantity,
                    price_data: {
                        currency: "gbp",
                        unit_amount: cartItem.product.currentPrice * 100,
                        product_data: {
                            name: cartItem.product.name,
                            images: [cartItem.product.photos[0]],
                        },
                    },
                };
            });
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                success_url: process.env.CLIENT_PATHNAME + `/checkout/complete/${cart}`,
                cancel_url: process.env.CLIENT_PATHNAME + `/checkout/cancelled/${cart}`,
                line_items: lineItems,
                mode: "payment",
            });
            return res.json({ url: session.url });
        }
        catch (err) {
            return next(err);
        }
    }),
];
exports.checkoutController = {
    createSession,
};
