// Function to add movie to favorites
 function addToFavorites(movieDetails) {
    // Get favorites from local storage or initialize as empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Check if movie already exists in favorites
    const exists = favorites.some(favorite => favorite.imdbID === movieDetails.imdbID);
    
    // If movie doesn't exist in favorites, add it
    if (!exists) {
      favorites.push(movieDetails);
      // Save updated favorites to local storage
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setTimeout(()=>{alert(`${movieDetails.Title} Movie Added to Favorites`);},100);
      
    } else {
      alert(`${movieDetails.Title} Movie is already in Favorites`);
    }
  }
  
  // Function to remove movie from favorites
   function removeFromFavorites(imdbID) {
    // Get favorites from local storage or initialize as empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Filter out the movie to remove
    favorites = favorites.filter(favorite => favorite.imdbID !== imdbID);
    
    // Save updated favorites to local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`Movie Removed From Favourites`);
  }

// for rendering Favourites and displaying them

  function renderFavorites() {
    // Get favorites from local storage or initialize as empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    // Get the container where favorites will be displayed
    const favoritesContainer = document.getElementById('favorites-container');
  
    // Clear existing content
    favoritesContainer.innerHTML = '';
  
    // Iterate through favorites and create HTML elements to display each favorite movie
    favorites.forEach(movie => {
      const movieElement = document.createElement('div');

      movieElement.innerHTML = `
        <div class="card mb-3 w-100 h-100 " style="max-width: 800px;">
          <div class="row g-0 ">
            <div class="col-md-4">
              <img src="${movie.Poster !== 'N/A' ? movie.Poster : './Images/no_image.jpg'}" class="img-fluid rounded-start object-fit-cover w-100 h-100" alt="movie poster">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <hr>
                <p class="card-text p-2"><b>Year:</b>&nbsp;${movie.Year}</p>
                <p class="card-text p-2"><b>Rated:</b>&nbsp;${movie.Rated}</p>
                <p class="card-text p-2"><b>Released:</b>&nbsp;${movie.Released}</p>
                <p class="card-text p-2"><b>Genre:</b>&nbsp;${movie.Genre}</p>
                <p class="card-text p-2"><b>Writer:</b>&nbsp;${movie.Writer}</p>
                <p class="card-text p-2"><b>Actors:</b>&nbsp;${movie.Actors}</p>
                <p class="card-text p-2 text-md-start"><b>Plot:</b>&nbsp;${movie.Plot}</p>
                <p class="card-text p-2"><b>Language:</b>&nbsp;${movie.Language}</p>
                <p class="card-text p-2"><b>Awards:</b>&nbsp;${movie.Awards}</p>
                <p class="card-text float-md-end">
                  <a href="#" class="text-danger float-md-start m-2 favorite-link"><i class="fa-regular fa-heart heart"></i></a>
                  <a href="#" class="text-body-secondary float-md-end m-2 delete-link"><i class="fa-solid fa-trash "></i></a>
                </p>
              </div>
            </div>
          </div>
        </div>
      `;
      favoritesContainer.appendChild(movieElement);

      // Click Events for adding and removing favourtites
      const favoriteLink = movieElement.querySelector('.favorite-link');
      favoriteLink.addEventListener('click', () => addToFavorites(movie));

      const deleteLink = movieElement.querySelector('.delete-link');
      deleteLink.addEventListener('click', () => {removeFromFavorites(movie.imdbID)
    movieElement.innerHTML=""});
    });
  }
  
  // Call renderFavorites function when the page loads
  window.onload = renderFavorites;

  // Exporting the functions
  export {addToFavorites,removeFromFavorites};