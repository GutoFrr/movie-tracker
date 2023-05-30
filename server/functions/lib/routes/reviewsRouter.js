"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
// import rateLimit from 'express-rate-limit';
const reviewsController_1 = require("../controllers/reviewsController");
// const apiLimiter = rateLimit({
//   windowMs: 10 * 60 * 1000,
//   max: 10,
//   standardHeaders: true,
//   legacyHeaders: false,
// });
router.route('/').post(reviewsController_1.createReview);
router.route('/movie/:id').get(reviewsController_1.getMovieReviews);
router.route('/:id').get(reviewsController_1.getSingleReview).patch(reviewsController_1.updateReview).delete(reviewsController_1.deleteReview);
exports.default = router;
//# sourceMappingURL=reviewsRouter.js.map