const getReviews = (req, res) => {
  res.send('Get reviews')
}

const createReview = (req, res) => {
  res.send('Create review')
}

const getSingleReview = (req, res) => {
  res.send('Get single review')
}

const updateReview = (req, res) => {
  res.send('Update review')
}

const deleteReview = (req, res) => {
  res.send('Delete review')
}

export { getReviews, createReview, getSingleReview, updateReview, deleteReview }
