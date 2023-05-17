import { NextFunction, Request, Response } from "express"
import { Category, Subcategory, Brand, Product } from "../models"
import { body, validationResult } from "express-validator"
import { ProductBody, ProductQuery } from "../types"
import { validateArrayOfObjectIds } from "../utilities"
import { isValidObjectId } from "mongoose"

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } =  req.params
        const product = await Product.findOne({ slug: productId }).exec()
        return res.status(200).send({ product })
    } catch (err) {
        return next(err)
    }
}

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category, subcategory, brand } = req.query
        const query:ProductQuery = {}
        if (category) {
            query.categories = category
            query.subcategories = subcategory
            query.brand = brand
        }
        const products = await Product.find({query}).populate('categories', 'subcategories', 'brand').exec()
        return res.status(200).send({ products })
    } catch (err) {
        return next(err)
    }
}

const postProduct = [
    body('name').isString().notEmpty().trim(),
    body('categories').isArray().custom((value) => validateArrayOfObjectIds(value)),
    body('subcategories').isArray().custom((value) => validateArrayOfObjectIds(value)),
    body('brand').custom((value) => isValidObjectId(value)),
    body('fullPrice').isNumeric(),
    body('currentPrice').isNumeric(),
    body('description').isString().notEmpty().trim(),
    body('features').isArray(),
    body('whatsIncluded').isArray(),
    body('isFeatured').isBoolean(),
    body('isOnSale').isBoolean(),
    body('photos').isArray(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error('Validation error')
            }
            const { 
                name,
                categories,
                subcategories,
                brand,
                fullPrice,
                currentPrice,
                description,
                features,
                whatsIncluded,
                isFeatured,
                isOnSale,
                photos,
            }: ProductBody = req.body
            categories.forEach(async (category) => {
                const categoryInDatabase = await Category.findById(category)
                if (!categoryInDatabase) {
                    throw new Error('Specified category was not in database')
                }
            })
            subcategories.forEach(async (subcategory) => {
                const subcategoryInDatabase = await Subcategory.findById(subcategory)
                if (!subcategoryInDatabase) {
                    throw new Error('Specified subcategory was not in database')
                }
            })
            const product = new Product({
                name,
                categories,
                subcategories,
                brand,
                fullPrice,
                currentPrice,
                description,
                features,
                whatsIncluded,
                isFeatured,
                isOnSale,
                photos,
            })
            const savedProduct = await product.save()
            return res.status(201).send({ product: savedProduct })
        } catch (err) {
            return next(err)
        }
    }
]

const updateProduct = [
    body('name').isString().notEmpty().trim(),
    body('categories').isArray().custom((value) => validateArrayOfObjectIds(value)),
    body('subcategories').isArray().custom((value) => validateArrayOfObjectIds(value)),
    body('brand').custom((value) => isValidObjectId(value)),
    body('fullPrice').isNumeric(),
    body('currentPrice').isNumeric(),
    body('description').isString().notEmpty().trim(),
    body('features').isArray(),
    body('whatsIncluded').isArray(),
    body('isFeatured').isBoolean(),
    body('isOnSale').isBoolean(),
    body('photos').isArray(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error('Validation error')
            }
            const { 
                name,
                categories,
                subcategories,
                brand,
                fullPrice,
                currentPrice,
                description,
                features,
                whatsIncluded,
                isFeatured,
                isOnSale,
                photos,
            }: ProductBody = req.body
            categories.forEach(async (category) => {
                const categoryInDatabase = await Category.findById(category)
                if (!categoryInDatabase) {
                    throw new Error('Specified category was not in database')
                }
            })
            subcategories.forEach(async (subcategory) => {
                const subcategoryInDatabase = await Subcategory.findById(subcategory)
                if (!subcategoryInDatabase) {
                    throw new Error('Specified subcategory was not in database')
                }
            })
            const brandInDatabase = await Brand.findById(brand)
            if (!brandInDatabase) {
                throw new Error('Specified brand was not in database')
            }
            const { productId } = req.params
            await Product.findOneAndUpdate(
                {
                    slug: productId,
                },
                {
                    name,
                    categories,
                    subcategories,
                    brand,
                    fullPrice,
                    currentPrice,
                    description,
                    features,
                    whatsIncluded,
                    isFeatured,
                    isOnSale,
                    photos,
                }
            ).exec()
            return res.status(200).send({ message: 'Product was updated' })
        } catch (err) {
            return next(err)
        }
    }
]

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params
        await Product.findOneAndDelete({ slug: productId })
        return res.status(200).send({ message: 'Product was deleted' })
    } catch (err) {
        return next(err)
    }
}

export const productsController = {
    getProduct,
    getAllProducts,
    postProduct,
    updateProduct,
    deleteProduct,
}
