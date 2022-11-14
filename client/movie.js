import './style.css'
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
          placeholder="Search..."
        />
      </form>
    </div>
  </nav>

  <div class="column">
    <div class="card">
        New Review
        <p><strong>Review: </strong>
          <input type="text" id="new_review" value="">
        </p>
        <p><strong>User: </strong>
          <input type="text" id="new_user" value="">
        </p>
        <p><a href="#" onclick="createReview('new_review', 'new_user')">💾</a>
        </p>
    </div>
  </div>

  <section id="section"></section>
`

const main = document.getElementById('section')

getReviews(apiUrl)

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
