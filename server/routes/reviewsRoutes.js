import express from 'express'
const router = express.Router()

// controllers
import { getAllReviews } from '../controllers/reviewsController.js'

router.route('/').get(getAllReviews)

export default router
