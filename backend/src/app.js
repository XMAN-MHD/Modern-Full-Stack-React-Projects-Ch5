import express from 'express'
import { postsRoutes } from './routes/posts.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

postsRoutes(app)

export { app }
