const apiKey = import.meta.env.VITE_API_KEY;
const imgPath = import.meta.env.VITE_IMG_PATH;
const searchKey = import.meta.env.VITE_SEARCH_KEY;

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

  <section id="section"></section>
`;

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

async function returnMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);

    const movies = data.results;

    return (main.innerHTML = movies
      .map((item) => {
        return `
          <div class="card">
            <img src=${
              imgPath + item.poster_path
            } class="thumbnail" id="image" />
            <h3 id="title">${item.title}</h3>
            <a href="movie.html?id=${item.id}&title=${item.title}">
              <button type="button" class="check-review-btn">
                <p>Ver avaliações</p>
              </button>
            </a>
          </div>
      `;
      })
      .join(''));
  } catch (error) {
    console.log(error);
  }
}
returnMovies(apiKey);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(searchKey + searchItem);
    search.value = '';
  }
});
