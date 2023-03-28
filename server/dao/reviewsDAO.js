import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

let reviews

const injectDBDAO = async (conn) => {
  if (reviews) {
    return
  }

  try {
    reviews = await conn.db('movie-finder').collection('reviews')
  } catch (error) {
    console.error(`Unable to establish collection handles in userDAO: ${error}`)
  }
}

const addReviewDAO = async (movieId, user, review) => {
  try {
    const reviewDoc = {
      movieId: movieId,
      user: user,
      review: review,
    }

    console.log('adding')
    return await reviews.insertOne(reviewDoc)
  } catch (e) {
    console.error(`Unable to post review: ${e}`)
    return { error: e }
  }
}

const getReviewDAO = async (reviewId) => {
  try {
    return await reviews.findOne({ _id: ObjectId(reviewId) })
  } catch (error) {
    console.error(`Unable to get review: ${error}`)
    return { error: error }
  }
}

const updateReviewDAO = async (reviewId, user, review) => {
  try {
    const updateResponse = await reviews.updateOne(
      { _id: ObjectId(reviewId) },
      { $set: { user: user, review: review } }
    )

    return updateResponse
  } catch (error) {
    console.error(`Unable to update review: ${error}`)
    return { error: error }
  }
}

const deleteReviewDAO = async (reviewId) => {
  try {
    const deleteResponse = await reviews.deleteOne({ _id: ObjectId(reviewId) })

    return deleteResponse
  } catch (error) {
    console.error(`Unable to delete review: ${error}`)
    return { error: error }
  }
}

const getReviewsByMovieIdDAO = async (movieId) => {
  try {
    const cursor = await reviews.find({ movieId: parseInt(movieId) })
    return cursor.toArray()
  } catch (error) {
    console.error(`Unable to get review: ${error}`)
    return { error: error }
  }
}

export {
  injectDBDAO,
  addReviewDAO,
  getReviewDAO,
  updateReviewDAO,
  deleteReviewDAO,
  getReviewsByMovieIdDAO,
}
