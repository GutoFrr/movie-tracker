import * as express from 'express';
const router = express.Router();

// import rateLimit from 'express-rate-limit';
import {
  createReview,
  deleteReview,
  getMovieReviews,
  getSingleReview,
  updateReview,
} from '../controllers/reviewsController';

// const apiLimiter = rateLimit({
//   windowMs: 10 * 60 * 1000,
//   max: 10,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

router.route('/').post(createReview);
router.route('/movie/:id').get(getMovieReviews);
router.route('/:id').get(getSingleReview).patch(updateReview).delete(deleteReview);

export default router;
