import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello from server')
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})