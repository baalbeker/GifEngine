import { API_KEY } from "../common/constants.js";
import { favorites } from "../data.js";
import { renderFavorites } from "../data.js";

/**
* Displays details for a GIF with the given ID, including its title, image, username, rating, and a remove button.
* @function
* @param {string} id - The ID of the GIF to display details for.
* @returns {void}
*/
export function favDetails(id) {
  const link = `https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`;
  console.log("displaying details for GIF with ID", id);

  const container = document.createElement("div");
  container.id = "gif-details-container";

  const content = document.createElement("div");
  content.id = "gif-details";
  container.appendChild(content);

  container.addEventListener("click", event => {
    if (event.target === container) {
      container.remove();
    }
  });

  fetch(link)
    .then(response => response.json())
    .then(data => {
      const gif = data.data;
      const username = gif.username || "Unknown";
      const title = gif.title || "Untitled";
      const rating = gif.rating || "Unrated";
      content.innerHTML = `
        <h2>${title}</h2>
        <img src="${gif.images.original.url}" alt="${title}">
        <ul>
          <li>Username: ${username}</li>
          <li>Rating: ${rating}</li>
        </ul>
        <button class="rem-btn" data-id="${id}">Remove</button>
      `;
      content.style.display = "block";

      const remBtn = content.querySelector(".rem-btn");
      remBtn.addEventListener("click", () => {
        handleRemClick(id);
        renderFavorites();
      });
    })
    .catch(error => console.error(error));

  document.body.appendChild(container);
}

/**
* Handles the removal of a GIF from the favorites array and localStorage.
* @function
* @param {string} id - The ID of the GIF to remove from favorites.
* @returns {void}
*/
function handleRemClick(id) {
  const index = favorites.indexOf(id);
  if (index > -1) {
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    const container = document.getElementById("gif-details-container");
    container.remove();
  }
}


