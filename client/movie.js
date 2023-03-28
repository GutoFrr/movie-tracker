const url = new URL(location.href);
const movieId = url.searchParams.get('id');
const movieTitle = url.searchParams.get('title');

const apiUrl = 'http://localhost:5000/api/reviews';

document.querySelector('#app').innerHTML = `
  <nav class="navbar">
    <a class="logo" href="index.html">Movie Tracker</a>
    <div class="search-container">
      <form class="search-form" role="search" id="form">
        <input
          type="search"
          name="query"
          id="query"
          class="search"
          required
          placeholder="Pesquisar..."
        />
      </form>
    </div>
  </nav>

  <div class="title">
    <h3>Avaliações de:</h3>
    <h1 id="title"></h1>
  </div>

  <section id="movie-section"></section>

  <form class="movie-form">
    Nova Avaliação
    <div class="form-row">
      <label for="review">Avaliação: </label>
      <input type="text" name="review" id="new_review" value="" class="movie-input" required />
    </div>
    <div class="form-row">
      <label for="user">Usuário: </label>
      <input type="text" name="user" id="new_user" value="" class="movie-input" required />
    </div>
    <button class="submit" type="button" onclick="createReview('new_review', 'new_user')">
      Enviar
    </button>
  </form>
`;

const main = document.getElementById('movie-section');
const title = document.getElementById('title');

title.innerText = movieTitle;

async function getReviews(url) {
  try {
    const res = await fetch(url + '/movie/' + movieId);
    const data = await res.json();
    console.log(data);

    return (main.innerHTML = data
      .map((review) => {
        return `
          <div class="review-card" id="${review._id}">
            <p>
              <strong>Avaliação: </strong>${review.review}
            </p>
            <p>
              <strong>Usuário: </strong>${review.user}
            </p>
            <div class="review-btns">
              <button class="edit-btn" type="button" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">
                Editar
              </button>
              <button class="delete-btn" type="button" onclick="deleteReview('/${review._id}')">
                Deletar
              </button>
            </div>
          </div>
      `;
      })
      .reverse()
      .join(''));
  } catch (error) {
    console.log(error);
  }
}

getReviews(apiUrl);

async function createReview(reviewInputId, userInputId, id = '') {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;

  if (id) {
    try {
      const res = await fetch(apiUrl + '/' + id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user, review: review }),
      });

      const data = await res.json();
      console.log(data);

      location.reload();
    } catch (error) {
      console.log(error);
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
      });

      const data = await res.json();
      console.log(data);

      location.reload();
    } catch (error) {
      console.log(error);
    }
  }
}

async function editReview(id, review, user) {
  const element = document.getElementById(id);
  const reviewInputId = 'review' + id;
  const userInputId = 'user' + id;

  element.innerHTML = `
  <div class="edit-form">
    Editar avaliação
    <div class="form-row">
      <label for="review">Avaliação: </label>
      <input type="text" name="review" id="${reviewInputId}" value="${review}" class="movie-input" />
    </div>
    <div class="form-row>
      <label for="user">Usuário: </label>
      <input type="text" name="user" id="${userInputId}" value="${user}" class="movie-input" />
    </div>
    <button class="submit" type="button" onclick="createReview('${reviewInputId}', '${userInputId}', '${id}')">
      Salvar
    </button>
  </div>
  `;
}

async function deleteReview(id) {
  try {
    const res = await fetch(apiUrl + id, {
      method: 'DELETE',
    });

    const data = await res.json();
    console.log(data);

    location.reload();
  } catch (error) {
    console.log(error);
  }
}
