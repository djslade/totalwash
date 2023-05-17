import { NextFunction, Request, Response } from "express"
import { Category } from "../models"
import { body, validationResult } from "express-validator"
import { isValidObjectId } from "mongoose"

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } =  req.params
        const category = await Category.findOne({ slug: categoryId }).exec()
        return res.status(200).send({ category })
    } catch (err) {
        return next(err)
    }
}

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find().exec()
        return res.status(200).send({ categories })
    } catch (err) {
        return next(err)
    }
}

const postCategory = [
    body('name').isString().notEmpty().trim(),
    body('description').isString().notEmpty().trim(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error('Validation error')
            }
            const { name, description } = req.body
            const category = new Category({
                name,
                description,
            })
            const savedCategory = await category.save()
            return res.status(201).send({ category: savedCategory })
        } catch (err) {
            return next(err)
        }
    }
]

const updateCategory = [
    body('name').isString().notEmpty().trim(),
    body('description').isString().notEmpty().trim(),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new Error('Validation error')
            }
            const { name, description } = req.body
            const { categoryId } = req.params
            await Category.findOneAndUpdate(
                {
                    slug: categoryId,
                },
                {
                    name,
                    description,
                }
            ).exec()
            return res.status(201).send({ message: 'Category was updated' })
        } catch (err) {
            return next(err)
        }
    }
]

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params
        await Category.findOneAndDelete({ slug: categoryId })
        return res.status(200).send({ message: 'Category was deleted' })
    } catch (err) {
        return next(err)
    }
}

export const categoriesController = {
    getCategory,
    getAllCategories,
    postCategory,
    updateCategory,
    deleteCategory,
}