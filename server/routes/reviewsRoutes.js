import express from 'express';
const router = express.Router();

// controllers
import {
  getReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewsController.js';

router.route('/movie/:id').get(getReviews);
router.route('/new').post(createReview);
router
  .route('/:id')
  .get(getSingleReview)
  .put(updateReview)
  .delete(deleteReview);

export default router;
