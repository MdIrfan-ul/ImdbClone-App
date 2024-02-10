// Api key from Omdb website
const api = ` 87721e0e`;

// Targeting the div using dom
const movieSearch = document.getElementById("movie-search");
const searchList = document.getElementById("search-list");


// Load Movies from API
async function loadMovies(searchMovie) {
  try {
    const url = `https://www.omdbapi.com/?s=${searchMovie}&page=1&apikey=87721e0e`;
    const res = await fetch(`${url}`);
    const data = await res.json();
    if (data.Response === "True") await displayMovieList(data.Search);
  }
  catch (error) {
    console.error(error);
  }

}
// FindMovies with the search
async function findMovies() {
  try {
    let searchItem = movieSearch.value.trim();
    if (searchItem.length > 0) {
      searchList.classList.remove("hide-search-list");
      await loadMovies(searchItem);
    } else {
      searchList.classList.add("hide-search-list");
    }
  } catch (error) {
    console.error(error);
  }

}
// Displays the MovieList in the SearchList container
async function displayMovieList(movies) {
  try {
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
      let movieListItem = document.createElement("div");
      movieListItem.dataset.id = movies[idx].imdbID;
      movieListItem.classList.add("search-list-item");
      if (movies[idx].Poster != "N/A") {
        moviePoster = movies[idx].Poster;
      } else {
        moviePoster = "./Images/no_image.jpg";
      }
      movieListItem.innerHTML = `<div class = "search-item-thumbnail">
        <img src = "${moviePoster}" alt="moviePoster">
    </div>
    <div class = "search-item-info">
        <h3>${movies[idx].Title}</h3>
        <p>${movies[idx].Year}</p>
    </div>`;
      searchList.appendChild(movieListItem);

      searchList.removeEventListener('click', handleMovieClick);
      searchList.addEventListener('click', handleMovieClick);
    }
  }
  catch (error) { console.error(error) }

}

// It redirects to the movies.html when the searchlist is clicked
function handleMovieClick(event) {
  const movieItem = event.target.closest(".search-list-item");
  if (movieItem) {
    const imdbID = movieItem.dataset.id;
    window.location.href = `movies.html?imdbID=${imdbID}`;
  }
}


