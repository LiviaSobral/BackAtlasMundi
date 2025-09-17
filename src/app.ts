import express from 'express'
import { config } from 'dotenv'
import routes from './routes'
import cors from "cors";

config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

export default app