import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

let reviews

const injectDB = async (conn) => {
  if (reviews) {
    return
  }

  try {
    reviews = await conn.db('personalprojects').collection('movie-finder')
  } catch (error) {
    console.error(`Unable to establish collection handles in userDAO: ${error}`)
  }
}

const createReview = async (movieId, user, review) => {
  try {
    const reviewDoc = {
      movieId: movieId,
      user: user,
      review: review,
    }

    return await reviews.insertOne(reviewDoc)
  } catch (error) {
    console.error(`Unable to post review: ${error}`)
    return { error: error }
  }
}

const getReview = async (reviewId) => {
  try {
    return await reviews.findOne({ _id: ObjectId(reviewId) })
  } catch (error) {
    console.error(`Unable to get review: ${error}`)
    return { error: error }
  }
}

const updateReview = async (reviewId, user, review) => {
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

const deleteReview = async (reviewId) => {
  try {
    const deleteResponse = await reviews.deleteOne({ _id: ObjectId(reviewId) })

    return deleteResponse
  } catch (error) {
    console.error(`Unable to delete review: ${error}`)
    return { error: error }
  }
}

const getReviewsByMovieId = async (movieId) => {
  try {
    const cursor = await reviews.find({ movieId: parseInt(movieId) })
    return cursor.toArray()
  } catch (error) {
    console.error(`Unable to get review: ${error}`)
    return { error: error }
  }
}

export { injectDB, createReview, getReview, updateReview, deleteReview }
