// server
import express from 'express'
const app = express()

import 'express-async-errors'

// packages
import cors from 'cors'

// routes
import reviews from './routes/reviewsRoutes.js'

app.use(cors())
app.use(express.json())

app.use('/api/reviews', reviews)
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }))

export default app
