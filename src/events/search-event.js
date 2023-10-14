import { toTrendingView } from "../views/trending-view.js";
import { API_KEY } from "../common/constants.js";

/**
Renders the search view for Giphy GIFs.
@param {number} limit - The maximum number of search results to display.
@param {string} query - The search query to fetch results for.
@returns {void}
*/

export const toSearchView = (limit, query) => {
  if (!query) {
    alert("Please enter a search term");
    toTrendingView().then(function(trendingViewHtml) {
      container.innerHTML = trendingViewHtml;
    });
    return;
  }

  fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("container");

      const searchContainer = document.createElement("div");
      searchContainer.classList.add("search-container");
      container.innerHTML = "";
      container.appendChild(searchContainer);

      data.data.forEach(gif => {
        const img = document.createElement("img");
        img.src = gif.images.original.url;
        img.dataset.id = gif.id;
        img.classList.add("gif-button");
        searchContainer.appendChild(img);
      });
    })
    .catch(error => {
      console.error("Error with displaying search results:", error);
    });
};