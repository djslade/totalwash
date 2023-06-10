import mongoose from "mongoose"
import dotenv from "dotenv"
import { Category, Product, Range, Subcategory } from "./models"

dotenv.config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI || "")

const updatedb = async () => {
    try {
        const parents = await Category.find().exec()
        const parentsPromises:any = parents.map(async (parent) => {
            const { name, description, photo } = parent
            const newRange = new Range({
                name,
                description,
                photo,
            })
            const savedRange = await newRange.save()
            return {
                name,
                id: savedRange._id
            }
        })
        const parentIds = await Promise.all(parentsPromises)
        const subcategories = await Subcategory.find().populate('categories').exec()
        const otherRanges = subcategories.map((subcategory) => {
            const { name, description, photo } = subcategory
            const categories:any[] = subcategory.categories
            const parents = categories.map((category) => {
                return parentIds.filter((id) => id.name === category.name)[0].id
            })
            return {
                name,
                description,
                photo,
                parents,
            }
        })
        const rangesPromises:any = otherRanges.map(async (range) => {
            const { name, description, photo, parents } = range
            const newRange = new Range({
                name,
                description,
                photo,
                parents
            })
            const savedRange = await newRange.save()
            return {
                name,
                id: savedRange._id
            }
        })
        const otherRangesIds = await Promise.all(rangesPromises)
        const allRangeIds = [...parentIds, ...otherRangesIds]
        const products = await Product.find().populate('categories').populate('subcategories').exec()
        products.forEach(async (product) => {
            const categoriesAndSubcategories:any[] = [...product.categories, ...product.subcategories]
            const ranges = categoriesAndSubcategories.map((item) => {
                return allRangeIds.filter((id) => id.name === item.name)[0].id
            })
            const updatedProduct = await Product.findByIdAndUpdate(product._id, {
                ranges
            })
        })
    } catch (err) {
        console.log(err)
    } finally {
        console.log('all done')
    }
}

updatedb()