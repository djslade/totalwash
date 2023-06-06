import { Product } from "./models"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI || "")

const updatedb = async () => {
    try {
        await Product.findOneAndUpdate({
            name: "Milano Hest - Stone Grey Traditional Freestanding Corner Shower Bath with Black Feet and Black Grid Screen - 1685mm x 750mm - Left/Right Hand Options",
        }, {
            description: [
                "Make a style statement in your traditional bathroom with the stunning Milano Hest stone grey 1685mm x 750mm freestanding corner shower bath, complete with black grid glass screen and decorative black feet.",
                "This freestanding bath comes in left and right hand corner options to suit your bathroom design - just make your selection from the options above.",
                "This robust and sturdy freestanding corner bath features a stone grey exterior and black feet, creating a bold yet utterly elegant and sophisticated look. There’s ample bathing space for a relaxing soak, and thanks to the corner design and the included glass screen, you can shower in total comfort too.",
                "The bath screen features a black grid pattern, creating a striking look. Featuring 6mm toughened glass with an easy-clean protective coating, the bath screen is a stylish and practical way to protect your bathroom floor from spills and splashes when taking a shower.",
                "Team with some stylish traditional Milano black bath taps to complete and further elevate the look of this freestanding bath.",
            ],
        })
    } catch (err) {
        console.log(err)
    } finally {
        console.log('all done')
    }
}

updatedb()