import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

dotenv.config()

const app = express()

const port = process.env.PORT

mongoose.set('strictQuery', false)

mongoose.plugin(slug)

mongoose.connect(process.env.MONGO_URI || '')

app.get('/', (req, res) => {
    res.send('Hello from server')
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})