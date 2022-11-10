import { IMG_PATH, SEARCH_KEY, API_LINK } from './secrets.js'

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
      image.src = IMG_PATH + element.poster_path

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
returnMovies(API_LINK)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  main.innerHTML = ''

  const searchItem = search.value

  if (searchItem) {
    returnMovies(SEARCH_KEY + searchItem)
    search.value = ''
  }
})
