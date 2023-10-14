import { API_KEY } from "../common/constants.js";
import { favorites } from "../data.js";
import { renderMyUploads } from "../views/my-uploads-view.js";

/**
Fetches details of a GIF from Giphy API and displays them in a container.
Allows the user to favorite the GIF and remove it if it was uploaded by them.
Also provides a share button to share the GIF on different platforms.
@param {string} id - The ID of the GIF to display details of.
*/
export function displayGifDetails(id) {
  const link = `https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`;
  console.log("displaying details for GIF with ID", id);

  // Create a container for the GIF details
  const container = document.createElement("div");
  container.id = "gif-details-container";

  // Create a div to hold the GIF details
  const content = document.createElement("div");
  content.id = "gif-details";
  container.appendChild(content);

  // Remove the container when the user clicks outside the GIF details
  container.addEventListener("click", event => {
    if (event.target === container) {
      container.remove();
    }
  });

  fetch(link)
    .then(response => response.json())
    .then(data => {
      // Get the username, title, and rating of the GIF
      const gif = data.data;
      const username = gif.username || "Unknown";
      const title = gif.title || "Untitled";
      const rating = gif.rating || "Unrated";

      // Add the GIF details to the content div
      content.innerHTML = `
      <h2>${title}</h2>
      <img src="${gif.images.original.url}" alt="${title}">
      <ul>
        <li>Username: ${username}</li>
        <li>Rating: ${rating}</li>
      </ul>
      <button class="fav-btn ${favorites.includes(id) ? "favorited" : ""}" data-id="${id}">
        ${favorites.includes(id) ? "Remove from favorites!" : "Favorite this"}
      </button>
      <img class="share-img" src="images/share1.png" alt="Share">
      
      `;

      // Add a "Remove" button if the GIF has been uploaded by the user
      const myUploadsString = localStorage.getItem("myUploads");
      if (myUploadsString) {
        const myUploads = JSON.parse(myUploadsString);
        if (myUploads.includes(id)) {
          const removeButton = document.createElement("button");
          removeButton.classList.add("remove-btn");
          removeButton.textContent = "Remove";
          removeButton.addEventListener("click", () => {
            const index = myUploads.indexOf(id);
            if (index !== -1) {
              myUploads.splice(index, 1);
              localStorage.setItem("myUploads", JSON.stringify(myUploads));
            }
            container.remove();
            renderMyUploads();
          });
          content.appendChild(removeButton);
        }
      }

      content.style.display = "block";

      // Add a click event listener to the favorite button
      const favBtn = content.querySelector(".fav-btn");
      favBtn.addEventListener("click", () => {
        if (!favorites.includes(id)) {
          favorites.push(id);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          favBtn.textContent = "Remove from favorites!";
          favBtn.classList.add("favorited");
        } else {
          const index = favorites.indexOf(id);
          if (index !== -1) {
            favorites.splice(index, 1);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            favBtn.textContent = "Favorite this";
            favBtn.classList.remove("favorited");
          }
        }
      });

      const shareImg = content.querySelector(".share-img");
      const url = gif.images.original.url;
      shareImg.addEventListener("click", () => {
        const shareButtons = renderShareButtons(url);
        content.appendChild(shareButtons);
      });
      
      
    })
    .catch(error => {
      console.error(`Error fetching GIF with ID ${id}:`, error);
    });

  document.body.appendChild(container);
}

/**

Renders share buttons for a given URL and returns a container element.
@param {string} url - The URL to share.
@returns {HTMLElement} The container element containing the share buttons.
*/
function renderShareButtons(url) {
  // Create container for share buttons
  const container = document.createElement("div");
  container.classList.add("share-buttons-container");
  // Create container for URL details text
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details-container");
  const detailsText = document.createTextNode("Clip Link");
  detailsContainer.appendChild(detailsText);
  container.appendChild(detailsContainer);
  
  // Create input element to display URL
  const urlInput = document.createElement("input");
  urlInput.classList.add("url-input");
  urlInput.type = "text";
  urlInput.value = url;
  urlInput.readOnly = true;
  urlInput.style.width = "75%";
  container.appendChild(urlInput);
  
  // Create Facebook share button
  const fbShareImg = document.createElement("img");
  fbShareImg.src = "images/shareF.webp";
  fbShareImg.alt = "Share on Facebook";
  fbShareImg.style.width = "150px";
  fbShareImg.style.height = "150px";
  event.stopPropagation();
  fbShareImg.addEventListener("click", (event) => {
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(fbShareUrl, "_blank");
  });
  container.appendChild(fbShareImg);

  
  // Create Twitter share button
  const twitterShareImg = document.createElement("img");
  twitterShareImg.src = "images/shareT.webp";
  twitterShareImg.alt = "Share on Twitter";
  twitterShareImg.style.width = "150px";
  twitterShareImg.style.height = "150px";
  twitterShareImg.addEventListener("click", () => {
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}`;
  window.open(twitterShareUrl, "_blank");
  });
  container.appendChild(twitterShareImg);
  
  // Create Reddit share button
  const redditShareImg = document.createElement("img");
  redditShareImg.src = "images/shareR.webp";
  redditShareImg.alt = "Share on Reddit";
  redditShareImg.style.width = "150px";
  redditShareImg.style.height = "150px";
  redditShareImg.addEventListener("click", () => {
  const redditShareUrl = `https://www.reddit.com/submit?url=${url}`;
  window.open(redditShareUrl, "_blank");
  });
  container.appendChild(redditShareImg);
  
  // Hide container when user clicks outside of it
  document.addEventListener("click", (event) => {
  const isClickInside = container.contains(event.target);
  if (!isClickInside) {
  container.style.display = "none";
  }
  });
  
  return container;
  }
  