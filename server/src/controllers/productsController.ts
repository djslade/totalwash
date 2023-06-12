import { NextFunction, Request, Response } from "express"
import { Category, Product, Range } from "../models"
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
        const { range, sale, featured, minprice, maxprice } = req.query
        const textToSearch = req.query.q
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 0
        const offset = (page - 1) * limit
        const query:ProductQuery = {}
        if (range) {
            query.ranges = range
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

            switch(query.sortby) {
                case 'name':
                    return { name: 1} as any
                case 'high-low':
                    return { currentPrice: -1 } as any
                case 'low-high':
                    return { currentPrice: 1 } as any
                case 'relevance':
                    return { score : { $meta : 'textScore' } }
                default:
                    if (textToSearch) {
                        return { score : { $meta : 'textScore' } }
                    } else {
                        return { name: 1 } as any
                }         
            }
        }
        const sortby = getSortMethod(req.query)
        if (textToSearch) {
            const total = await Product
            .countDocuments(
                { $text: { $search: decodeURI(textToSearch as string) } },
                { score: { $meta: 'textScore' } }
            )
            const products = await Product
            .find(
                { $text: { $search: decodeURI(textToSearch as string) } },
                { score: { $meta: 'textScore' } }
              )
            .sort({ score : { $meta : 'textScore' } })
            .skip(offset)
            .limit(limit)
            .populate('ranges')
            .exec()
            return res.status(200).send({ products, total })
        } else {
            const total = await Product
            .countDocuments(query)
            const products = await Product
            .find(query)
            .sort(sortby)
            .skip(offset)
            .limit(limit)
            .populate('ranges')
            .exec()
            return res.status(200).send({ products, total })
        }
    } catch (err) {
        return next(err)
    }
}

const postProduct = [
    body('name').isString().notEmpty().trim(),
    body('ranges').isArray().custom((value) => validateArrayOfObjectIds(value)),
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
                ranges,
                fullPrice,
                currentPrice,
                description,
                features,
                whatsIncluded,
                isFeatured,
                isOnSale,
                photos,
            }: ProductBody = req.body
            ranges.forEach(async (range) => {
                const rangeInDatabase = await Category.findById(range)
                if (!rangeInDatabase) {
                    throw new Error('Specified range was not in database')
                }
            })
            const product = new Product({
                name,
                ranges,
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
    body('ranges').isArray().custom((value) => validateArrayOfObjectIds(value)),
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
                ranges,
                fullPrice,
                currentPrice,
                description,
                features,
                whatsIncluded,
                isFeatured,
                isOnSale,
                photos,
            }: ProductBody = req.body
            ranges.forEach(async (range) => {
                const rangeInDatabase = await Range.findById(range)
                if (!rangeInDatabase) {
                    throw new Error('Specified range was not in database')
                }
            })
            const { productId } = req.params
            await Product.findOneAndUpdate(
                {
                    slug: productId,
                },
                {
                    name,
                    ranges,
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
