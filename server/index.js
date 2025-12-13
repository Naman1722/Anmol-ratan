import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import apiRouter from './routes/api.js'
import { connectDB } from "./config/db-config.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = process.env.BACKEND_PORT || 8000


app.use(cors())
app.use(express.json())
connectDB()

app.use('/api', apiRouter)

const clientDistPath = path.join(__dirname, '..', 'client', 'dist')
app.use(express.static(clientDistPath))

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'))
})


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
