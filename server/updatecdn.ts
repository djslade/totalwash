import mongoose from "mongoose"
import { Range } from "./src/models"
import { Product } from "./src/models"
import dotenv from "dotenv"

dotenv.config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI || "")

const updateRangeCollection = async () => {
    try {
      const ranges = await Range.find({}); // Fetch all documents from the Range collection
      const regex = /totalwash\//g;
      for (const range of ranges) {
        const updatedPhoto = range.photo?.replace(
          /https:\/\/d2tgvtaoa6ihgv\.cloudfront\.net\//g,
          "https://d2tgvtaoa6ihgv.cloudfront.net/totalwash/"
        );
        range.photo = updatedPhoto;
        console.log(range.photo);
        await range.save(); // Save the updated document
      }
      console.log("Task complete");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProductCollection = async () => {
    try {
        const products = await Product.find({});
        for (const product of products) {
            const updatedPhotos = product.photos?.map((photo) => {
                const newPhoto = photo.replace(
                    /https:\/\/d2tgvtaoa6ihgv\.cloudfront\.net\//g,
                    "https://d2tgvtaoa6ihgv.cloudfront.net/totalwash/"
                  );
                return newPhoto
            })
            product.photos = updatedPhotos;
            console.log(product.photos)
            await product.save()
        }
        console.log("Task complete")
    } catch (error) {
        console.log(error)
    }
  }

  const logAllPhotos = async () => {
    const products = await Product.find({})
    for (const product of products) {
        product.photos?.map((photo) => {
            console.log(photo)
            return photo
        })
    }
    const ranges = await Range.find({})
    for (const range of ranges) {
        console.log(range.photo)
    }
  }

  logAllPhotos()