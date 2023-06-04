import { Subcategory } from "./models"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI || "")

const updatedb = async () => {
    try {
        await Subcategory.findOneAndUpdate({
            slug: "bathroom-accessories",
        }, {
            photo: process.env.CDN_URL + "accessories/bathroom-accessories/bbs_87003_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "shower-accessories",
        }, {
            photo: process.env.CDN_URL + "accessories/shower-accessories/sbshwmsq500_ls_1000_2.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "toilet-accessories",
        }, {
            photo: process.env.CDN_URL + "accessories/toilet-accessories/bctfp001ch_ls_1000_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "counter-top-basins",
        }, {
            photo: process.env.CDN_URL + "basins/counter-top-basins/bfb2001_hr_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "pedestal-basins",
        }, {
            photo: process.env.CDN_URL + "basins/pedestal-basins/hlc02931_ls_new_1000_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "washstands",
        }, {
            photo: process.env.CDN_URL + "basins/washstands/bcws820c_ls_1000_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "corner-baths",
        }, {
            photo: process.env.CDN_URL + "baths/corner-baths/wbywhnu771l-1_ls_2_1000_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "freestanding-baths",
        }, {
            photo: process.env.CDN_URL + "baths/freestanding-baths/fsb036_ls_1000_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "shower-baths",
        }, {
            photo: process.env.CDN_URL + "baths/shower-baths/ssebsbsb_ls_new_1000_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "small-baths",
        }, {
            photo: process.env.CDN_URL + "baths/small-baths/ssbmerdpan_ls_1000_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "standard-baths",
        }, {
            photo: process.env.CDN_URL + "baths/standard-baths/tr-sos1770_1_ls_1000_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "mirrors",
        }, {
            photo: process.env.CDN_URL + "furniture/mirrors/bfm1004gr-uv_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "cabinets-and-storage",
        }, {
            photo: process.env.CDN_URL + "furniture/storage-units/bbs_78613_image_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "vanity-units",
        }, {
            photo: process.env.CDN_URL + "furniture/vanity-units/bfcm1200w_ls_2_chrome_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "mixer-showers-and-sets",
        }, {
            photo: process.env.CDN_URL + "showers/mixer-showers-and-sets/ml7046_ls_1_new_1000_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "bidets",
        }, {
            photo: process.env.CDN_URL + "toilets/bidets/wasbid_co_1000_1.jpg"
        })
        await Subcategory.findOneAndUpdate({
            slug: "standard-toilets",
        }, {
            photo: process.env.CDN_URL + "toilets/standard-toilets/bctcc008_ls_1000_1.jpg"
        })
    } catch (err) {
        console.log(err)
    }
}

updatedb()