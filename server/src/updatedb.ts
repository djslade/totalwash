import { Category } from "./models"
import mongoose, { ObjectId } from "mongoose"
import dotenv from "dotenv"

dotenv.config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI || "")

const updatedb = async () => {
    try {
        await Category.findOneAndUpdate({
            slug: "furniture",
        }, {
            photo: process.env.CDN_URL + "furniture/furniture-cover.jpg"
        })
        await Category.findOneAndUpdate({
            slug: "accessories",
        }, {
            photo: process.env.CDN_URL + "accessories/accessories-cover.jpg"
        })
        await Category.findOneAndUpdate({
            slug: "basins",
        }, {
            photo: process.env.CDN_URL + "basins/basins-cover.jpg"
        })
        await Category.findOneAndUpdate({
            slug: "baths",
        }, {
            photo: process.env.CDN_URL + "baths/baths-cover.jpg"
        })
        await Category.findOneAndUpdate({
            slug: "showers",
        }, {
            photo: process.env.CDN_URL + "showers/showers-cover.jpg"
        })
        await Category.findOneAndUpdate({
            slug: "toilets",
        }, {
            photo: process.env.CDN_URL + "toilets/toilets-cover.jpg"
        })
    } catch (err) {
        console.log(err)
    }
}

updatedb()