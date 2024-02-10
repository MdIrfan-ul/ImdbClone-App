// Importing functions for adding and removing Favourites

import { addToFavorites,removeFromFavorites } from "./favourites.js";


const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');
const resultBox = document.getElementById("result-container");

// Load movie details using the imdbID
async function loadMovieDetails() {
  try{
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=87721e0e`;
    const res = await fetch(url);
    const data = await res.json();
    await displayMovieDetails(data);
    
      // Event Listener to favorite link
      const favouriteLink = document.querySelector('.favorite-link');
      favouriteLink.addEventListener('click',()=>addToFavorites(data));
  
      const deleteLink = document.querySelector('.delete-link');
      deleteLink.addEventListener('click',()=>removeFromFavorites(data.imdbID));
  }
    catch(error){
      console.error(error)
    }
}
   
// displayMovieDetails 

  async function displayMovieDetails(details){
    try{
      resultBox.innerHTML=`<div class="card mb-3 w-100 h-100 bg-dark text-light" style="max-width: 800px;">
          <div class="row g-0 ">
            <div class="col-md-4">
              <img src="${(details.Poster!=="N/A")?details.Poster:"./Images/no_image.jpg"}" class="img-fluid rounded-start object-fit-cover w-100 h-100" alt="movie poster">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title ">${details.Title}</h5>
                <hr>
                <p class="card-text p-2"><b>Year:</b>&nbsp;${details.Year}</p>
                <p class="card-text p-2"><b>Rated:</b>&nbsp;${details.Rated}</p>
                <p class="card-text p-2"><b>Released:</b>&nbsp;${details.Released}</p>
                <p class="card-text p-2"><b>Genre:</b>&nbsp;${details.Genre}</p>
                <p class="card-text p-2"><b>Writer:</b>&nbsp;${details.Writer}</p>
                <p class="card-text p-2"><b>Actors:</b>&nbsp;${details.Actors}</p>
                <p class="card-text p-2 text-md-start"><b>Plot:</b>&nbsp;${details.Plot}</p>
                <p class="card-text p-2"><b>Language:</b>&nbsp;${details.Language}</p>
                <p class="card-text p-2"><b><i class="fa-solid fa-award"></i>:</b>&nbsp;${details.Awards}</p>
                <p class="card-text float-md-end"><a href="#"class="text-danger float-md-start m-2" ><i class="fa-regular fa-heart heart favorite-link"></i></a>
                  <a href="#"class="text-white-50 float-md-end  m-2"><i class="fa-solid fa-trash delete-link"></i></a></p>
              </div>
            </div>
          </div>
        </div>`;
    }
    catch(error){console.error(error)}
  }
  
// when the page loads the loadMovieDetails function will be called for displaying the movie Details 

  window.onload=loadMovieDetails;