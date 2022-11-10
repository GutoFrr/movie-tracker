import './style.css'
const apiKey = import.meta.env.VITE_API_KEY
const imgPath = import.meta.env.VITE_IMG_PATH
const searchKey = import.meta.env.VITE_SEARCH_KEY

document.querySelector('#app').innerHTML = `
  <nav class="navbar">
    <a class="logo" href="#">Movie Finder</a>
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

  <section id="section">

  </section>
`

const main = document.getElementById('section')
const form = document.getElementById('form')
const search = document.getElementById('query')

const returnMovies = async (url) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.results)

    data.results.forEach((element) => {
      const divCard = document.createElement('div')
      divCard.setAttribute('class', 'card')

      const divRow = document.createElement('div')
      divRow.setAttribute('class', 'row')

      const divColumn = document.createElement('div')
      divColumn.setAttribute('class', 'column')

      const image = document.createElement('img')
      image.setAttribute('class', 'thumbnail')
      image.setAttribute('id', 'image')

      const title = document.createElement('h3')
      title.setAttribute('id', 'title')

      title.innerHTML = `${element.title}`
      image.src = imgPath + element.poster_path

      divCard.appendChild(image)
      divCard.appendChild(title)
      divColumn.appendChild(divCard)
      divRow.appendChild(divColumn)

      main.appendChild(divRow)
    })
  } catch (error) {
    console.log(error)
  }
}

returnMovies(apiKey)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  main.innerHTML = ''

  const searchItem = search.value

  if (searchItem) {
    returnMovies(searchKey + searchItem)
    search.value = ''
  }
})
