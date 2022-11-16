import {
  addReviewDAO,
  deleteReviewDAO,
  getReviewDAO,
  getReviewsByMovieIdDAO,
  updateReviewDAO,
} from '../dao/reviewsDAO.js'

const getReviews = async (req, res) => {
  try {
    let id = req.params.id || {}
    let reviews = await getReviewsByMovieIdDAO(id)

    if (!reviews) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    res.json(reviews)
  } catch (error) {
    console.log(`api, ${error}`)
    res.status(500).json({ error: error })
  }
}

const createReview = async (req, res) => {
  try {
    const movieId = parseInt(req.body.movieId)
    const user = req.body.user
    const review = req.body.review

    res.json({ movieId, user, review })
    return await addReviewDAO(movieId, user, review)
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(error)
  }
}

const getSingleReview = async (req, res) => {
  try {
    let id = req.params.id || {}
    let review = await getReviewDAO(id)

    if (!review) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    res.json(review)
  } catch (error) {
    console.log(`api, ${error}`)
    res.status(500).json({ error: error })
  }
}

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id
    const review = req.body.review
    const user = req.body.user

    const reviewResponse = await updateReviewDAO(reviewId, user, review)

    var { error } = reviewResponse
    if (error) {
      res.status(400).json({ error })
    }

    if (reviewResponse.modifiedCount === 0) {
      throw new Error('Unable to update review')
    }

    res.json({ status: 'Success' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id
    const reviewResponse = await deleteReviewDAO(reviewId)

    res.json({ status: 'success' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { getReviews, createReview, getSingleReview, updateReview, deleteReview }
