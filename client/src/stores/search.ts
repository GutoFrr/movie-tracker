import { reactive } from 'vue';

export const apiKey: string = import.meta.env.VITE_API_KEY;
export const searchKey: string = import.meta.env.VITE_SEARCH_KEY;

export const searchStore = reactive({
  movies: [],
  search: '',
});

export async function getMovies(url: string) {
  const res = await fetch(url, { cache: 'force-cache' });
  const data = await res.json();

  searchStore.movies = await data.results;
}

export function searchMovie() {
  searchStore.movies = [];

  const searchItem = searchStore.search;

  if (searchItem) {
    getMovies(searchKey + searchItem);
  } else {
    getMovies(apiKey);
  }
}
