import './style.css'

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

  <section id="section"></section>
`