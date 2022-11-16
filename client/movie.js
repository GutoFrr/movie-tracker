const url = new URL(location.href)
const movieId = url.searchParams.get('id')
const movieTitle = url.searchParams.get('title')

const apiUrl = 'http://localhost:5000/api/reviews'

document.querySelector('#app').innerHTML = `
  <nav class="navbar">
    <a class="logo" href="index.html">Movie Finder</a>
    <div class="search-container">
      <form class="search-form" role="search" id="form">
        <input
          type="search"
          name="query"
          id="query"
          class="search"
          required
          placeholder="Search..."
        />
      </form>
    </div>
  </nav>


  <div class="title">
    <h1>Reviews for:</h1>
    <h3 id="title"></h3>
  </div>

  <section id="movie-section"></section>

  <form onsubmit="createReview('new_review', 'new_user')" class="movie-form">
    New Review
    <div class="form-row">
      <label for="review">Review: </label>
      <input type="text" name="review" id="new_review" value="" class="movie-input" required />
    </div>
    <div class="form-row">
      <label for="user">User: </label>
      <input type="text" name="user" id="new_user" value="" class="movie-input" required />
    </div>
    <button class="submit" type="submit">
      Submit
    </button>
  </form>
`

const main = document.getElementById('movie-section')
const title = document.getElementById('title')

title.textContent = movieTitle

const getReviews = async (url) => {
  try {
    const res = await fetch(url + '/movie/' + movieId)
    const data = await res.json()
    console.log(data)

    return (main.innerHTML = data
      .map((review) => {
        return `
          <div class="review-card" id="${review._id}">
            <p>
              <strong>Review: </strong>${review.review}
            </p>
            <p>
              <strong>User: </strong>${review.user}
            </p>
            <div class="review-btns">
              <button class="edit-btn" type="button" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">
                Edit
              </button>
              <button class="delete-btn" type="button" onclick="deleteReview('/${review._id}')">
                Delete
              </button>
            </div>
          </div>
      `
      })
      .join(''))
  } catch (error) {
    console.log(error)
  }
}

getReviews(apiUrl)

const createReview = async (reviewInputId, userInputId, id = '') => {
  const review = document.getElementById(reviewInputId).value
  const user = document.getElementById(userInputId).value

  if (id) {
    try {
      const res = await fetch(apiUrl + '/' + id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user, review: review }),
      })

      const data = await res.json()
      console.log(data)

      location.reload()
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      const res = await fetch(apiUrl + '/new', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user, review: review, movieId: movieId }),
      })

      const data = await res.json()
      console.log(data)

      location.reload()
    } catch (error) {
      console.log(error)
    }
  }
}

const editReview = async (id, review, user) => {
  const element = document.getElementById(id)
  const reviewInputId = 'review' + id
  const userInputId = 'user' + id

  element.innerHTML = `
  <div class="edit-form">
    Edit Review
    <div class="form-row">
      <label for="review">Review: </label>
      <input type="text" name="review" id="${reviewInputId}" value="${review}" class="movie-input" />
    </div>
    <div class="form-row>
      <label for="user">User: </label>
      <input type="text" name="user" id="${userInputId}" value="${user}" class="movie-input" />
    </div>
    <button class="submit" type="button" onclick="createReview('${reviewInputId}', '${userInputId}', '${id}')">
      Save
    </button>
  </div>
  `
}

const deleteReview = async (id) => {
  try {
    const res = await fetch(apiUrl + id, {
      method: 'DELETE',
    })

    const data = await res.json()
    console.log(data)

    location.reload()
  } catch (error) {
    console.log(error)
  }
}
