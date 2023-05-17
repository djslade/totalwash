import { NextFunction, Request, Response } from "express"
import { Brand } from "../models"
import { body, validationResult } from "express-validator"

const getBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { brandId } =  req.params
        const brand = await Brand.findOne({ slug: brandId }).exec()
        return res.status(200).send({ brand })
    } catch (err) {
        return next(err)
    }
}

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const brands = await Brand.find().exec()
        return res.status(200).send({ brands })
    } catch (err) {
        return next(err)
    }
}

const postBrand = [
    body('name').isString().notEmpty().trim(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error('Validation error')
            }
            const { name } = req.body
            const brand = new Brand({
                name,
            })
            const savedBrand = await brand.save()
            return res.status(201).send({ Brand: savedBrand })
        } catch (err) {
            return next(err)
        }
    }
]

const updateBrand = [
    body('name').isString().notEmpty().trim(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error('Validation error')
            }
            const { name } = req.body
            const { brandId } = req.params
            await Brand.findOneAndUpdate(
                {
                    slug: brandId,
                },
                {
                    name,
                }
            ).exec()
            return res.status(201).send({ message: 'brand was updated' })
        } catch (err) {
            return next(err)
        }
    }
]

const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { brandId } = req.params
        await Brand.findOneAndDelete({ slug: brandId })
        return res.status(200).send({ message: 'Brand was deleted' })
    } catch (err) {
        return next(err)
    }
}

export const brandsController = {
    getBrand,
    getAllCategories,
    postBrand,
    updateBrand,
    deleteBrand,
}