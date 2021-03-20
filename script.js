/* 
step 1 = get and set all the API_URL, IMG_PATH and SEARCH_API - from theMoviedb website. 
step 2 - create getMovie function 
step 3 - call the getMovie function with API_URL as argument
step 4 - addEventListener to form (to bring in "form")
step 5 - bring in 'search'. Get the search.value that input into the search bar and call getMovie function 
with "SEARCH_API + serchTerm" as argument. 
step 6 - instead of console log the data.results, we create the showMovie function to show the movies on 'main'. 


*/

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=74685c682062104c586045002069da9e&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=74685c682062104c586045002069da9e&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

//get movies
getMovie(API_URL);

async function getMovie(url) {
  const res = await fetch(url);
  const data = await res.json();

  //instead of console log, create showMovies function to show all movies in DOM.
  showMovies(data.results);
}

//show Movies

function showMovies(movies) {
  //clear the main section
  main.innerHTML = '';

  //destructure from movie
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    //create movie element
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
              <img src="${IMG_PATH + poster_path}" alt="${title}">
              <div class="movie_infor">
                  <h4>${title}</h4>
                  <span class="${addVoteClass(
                    vote_average
                  )}">${vote_average}</span>
              </div>
  
              <div class="overview">
                  <h3>Overview</h3>
                  ${overview}
              </div>    
          `;

    main.appendChild(movieEl);
  });
}

function addVoteClass(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
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
