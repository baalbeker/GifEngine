import { trendingLoad } from "../events/trending-event.js";

/**
* Converts trending GIFs into HTML for display on the trending view page
* @function
* @returns {Promise<string>} - A Promise that resolves with the HTML string 
* for the trending view page or rejects with an error message
*/
export const toTrendingView = () => {
  return trendingLoad().then(trendingGifs => {
    let gifHTML = "";
    trendingGifs.forEach(gif => {
      gifHTML += `
        <div class="gif-container">
          <img src="${gif.images.original.url}" class="gif-button" data-id="${gif.id}">
        </div>
      `;
    });
    return `
      <div id="trending">
        <div class="content">
          ${gifHTML}
        </div>
      </div>
    `;
  }).catch(error => {
    console.error("Error with displaying trending gifs:", error);
  });
};