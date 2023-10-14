import { toAboutView } from "./views/about-view.js";
import { toTrendingView } from "./views/trending-view.js";
import { toSearchView } from "./events/search-event.js";
import { uploadView } from "./views/upload-view.js";
import { uploadFunc } from "./events/upload-event.js";
import { displayGifDetails } from "./events/details-event.js";
import { favDetails } from "./events/favorites-view.js";
import { renderMyUploads } from "./views/my-uploads-view.js";

/**
Retrieves the element with the correct data-page attribute or id and assigns it to a constant variable.
*/
const container = document.getElementById("container");
const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const header = document.getElementById("myHeader");
const trendingLink = document.querySelector("[data-page=\"trending\"]");
const favoritesLink = document.querySelector("[data-page=\"favorites\"]");
const uploadLink = document.querySelector("[data-page=\"upload\"]");
const myUploadsLink = document.querySelector("[data-page=\"uploads\"]");
const aboutLink = document.querySelector("[data-page=\"about\"]");

/**
* An array that holds the ids of the user's favorite gifs.
* @type {Array<string>}
*/
export let favorites = [];

/**
* Add event listeners to the container for handling gif button clicks and favorite button clicks.
* @function
* @param {object} event - The event object.
*/
container.addEventListener("click", event => {
  const gif = event.target.closest(".gif-button");
  if (gif) {
    const gifId = gif.dataset.id;
    displayGifDetails(gifId);
  }
  
  const favBtn = event.target.closest(".fav-btn");
  if (favBtn) {
    const gifId = favBtn.dataset.id;
    if (!favorites.includes(gifId)) {
      favorites.push(gifId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }
});

/**
* Add an event listener to the My Uploads link for rendering the My Uploads view when clicked.
* @function
*/
myUploadsLink.addEventListener("click", () => {
  console.log(11121);
  renderMyUploads();
});

/**
* Add an event listener to the Trending link for rendering the Trending view when clicked.
* @function
*/
trendingLink.addEventListener("click", () => {
  toTrendingView().then(trendingViewHtml => {
    container.innerHTML = trendingViewHtml;
  });
});

/**
* Add an event listener to the Search button for handling search queries.
* @function
*/
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
  const limit = (document.getElementById("limit-btn")).value;
  const query = searchInput.value;
  toSearchView(limit, query).then((searchViewHtml) => {
    container.innerHTML = searchViewHtml;
  });
}
});

/**
* Add an event listener to the Upload link for rendering the Upload view when clicked.
* @function
*/
uploadLink.addEventListener("click", () => {
  const uploadViewHtml = uploadView();
  container.innerHTML = uploadViewHtml;
  uploadFunc();
});

/**
* Add an event listener to the About link for rendering the About view when clicked.
* @function
*/
aboutLink.addEventListener("click", () => {
  container.innerHTML = toAboutView();
});

/**
* Add an event listener to the Favorites link for rendering the Favorites view when clicked.
* @function
*/
favoritesLink.addEventListener("click", () => {
  container.innerHTML = "";
  renderFavorites();
});

/**
* Adds an event listener to the header element, that when clicked adds the "animate" class to the header element's class list.
* @function
*/
header.addEventListener("click", () => {
  header.classList.add("animate");
});

/**
* Add an event listener to the window's onload event for rendering the Trending view.
* @function
* @returns {void}
*/
window.onload = async function () {
  const trendingViewHtml = await toTrendingView();
  container.innerHTML = trendingViewHtml;
};

/**
* Render the user's favorite gifs.
* @function
* @returns {void}
*/
export function renderFavorites() {
  const favoritesString = localStorage.getItem("favorites");
  if (favoritesString) {
    favorites = JSON.parse(favoritesString);
  }
  const favContainer = document.createElement("div");
  favContainer.classList.add("favorites-container");
  if (favorites.length === 0) { // add this line
    favContainer.textContent = "Favorite some gifs to show them here";
  } else { // add this line
    favorites.forEach(gifId => {
      const img = document.createElement("img");
      img.src = `https://media.giphy.com/media/${gifId}/giphy.gif`;
      const gifContainer = document.createElement("div");
      gifContainer.classList.add("gif-container");
      gifContainer.appendChild(img);
      gifContainer.addEventListener("click", () => {
        favDetails(gifId);
      });
      favContainer.appendChild(gifContainer);
    });
  }
  container.innerHTML = "";
  container.appendChild(favContainer);
}