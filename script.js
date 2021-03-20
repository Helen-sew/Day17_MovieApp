const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=74685c682062104c586045002069da9e&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=74685c682062104c586045002069da9e&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');

//get movies
getMovie(API_URL);

async function getMovie(url) {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.results);
}

//search

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovie(SEARCH_API + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});
