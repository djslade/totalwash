import { NextFunction, Request, Response } from "express"
import { Category, Subcategory, Product } from "../models"
import { body, validationResult } from "express-validator"
import { ParsedQs, ProductBody, ProductQuery } from "../types"
import { validateArrayOfObjectIds } from "../utilities"

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
        const { category, subcategory, sale, featured, minprice, maxprice, text } = req.query
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 0
        const offset = (page - 1) * limit
        const query:ProductQuery = {}
        if (category) {
            query.categories = category
        }
        if (subcategory) {
            query.subcategories = subcategory
        }
        if (sale === 'true' ) {
            query.isOnSale = true
        }
        if (featured === 'true' ) {
            query.isFeatured = true
        }
        if (minprice || maxprice) {
            query.currentPrice =  { $lte: parseInt(maxprice as string) || 1000000000, $gte: parseInt(minprice as string) || 0 }
        }
        const getSortMethod = (query:ParsedQs) => {
            if (text) {
                return { score : { $meta : 'textScore' } }
            }
            switch(query.sortby) {
                case 'name':
                    return { name: 1} as any
                case 'high-low':
                    return { currentPrice: -1 } as any
                case 'low-high':
                    return { currentPrice: 1 } as any
                default:
                    return { name: 1 } as any
            }
        }
        const sortby = getSortMethod(req.query)
        if (text) {
            const products = await Product
            .find(
                { $text: { $search: decodeURI(text as string) } },
                { score: { $meta: 'textScore' } }
              )
                .populate('categories', 'subcategories')
                .sort(sortby)
                .exec()
            return res.status(200).send({ products })
        } else {
            const products = await Product
            .find(query)
            .limit(limit)
            .skip(offset)
            .populate('categories', 'subcategories')
            .sort(sortby)
            .exec()
            return res.status(200).send({ products })
        }
    } catch (err) {
        return next(err)
    }
}

const postProduct = [
    body('name').isString().notEmpty().trim(),
    body('categories').isArray().custom((value) => validateArrayOfObjectIds(value)),
    body('subcategories').isArray().custom((value) => validateArrayOfObjectIds(value)),
    body('fullPrice').isNumeric(),
    body('currentPrice').isNumeric(),
    body('description').isArray(),
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
    body('fullPrice').isNumeric(),
    body('currentPrice').isNumeric(),
    body('description').isArray(),
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
            const { productId } = req.params
            await Product.findOneAndUpdate(
                {
                    slug: productId,
                },
                {
                    name,
                    categories,
                    subcategories,
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
