const getReviews = async (req, res) => {
  res.send('Get reviews')
}

const createReview = async (req, res) => {
  res.send('Create review')
}

const getSingleReview = async (req, res) => {
  res.send('Get single review')
}

const updateReview = async (req, res) => {
  res.send('Update review')
}

const deleteReview = async (req, res) => {
  res.send('Delete review')
}

export { getReviews, createReview, getSingleReview, updateReview, deleteReview }
