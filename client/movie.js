const url = new URL(location.href)
const movieId = url.searchParams.get('id')
const movieTitle = url.searchParams.get('title')

const apiUrl = 'http://localhost:5000/api/reviews'

document.querySelector('#app').innerHTML = `
  <nav class="navbar">
    <a class="logo" href="index.html">Movie Finder</a>
    <div class="search-container">
      <form role="search" id="form">
        <input
          type="search"
          name="query"
          id="query"
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

  <div class="card">
    New Review
    <strong>Review: </strong>
    <input type="text" id="new_review" value="" class="movie-input" />
    <strong>User: </strong>
    <input type="text" id="new_user" value="" class="movie-input" />
    <button type="button" onclick="createReview('new_review', 'new_user')">
      Submit
    </button>
  </div>

  <section id="movie-section"></section>
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
        <div class="row">
          <div class="column">
          <div class="card" id="${review._id}">
              <p>
                <strong>Review: </strong>${review.review}
              </p>
              <p>
                <strong>User: </strong>${review.user}
              </p>
              <p>
                <a href="#" onclick="editReview('${review._id}','${review.review}', '${review.user}')">✏️</a>
                <a href="#" onclick="deleteReview('${review._id}')">🗑</a>
              </p>
            </div>
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
      const res = await fetch(apiUrl + id, {
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

const editReview = async () => console.log('aaaa')
