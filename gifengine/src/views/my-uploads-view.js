import { displayGifDetails } from "../events/details-event.js";


/**
* Render the user's uploaded GIFs onto the page
* @function
* @returns {void}
*/
export function renderMyUploads() {
  const myUploadsString = localStorage.getItem("myUploads");
  if (myUploadsString) {
    const myUploads = JSON.parse(myUploadsString);
    const myUploadsContainer = document.createElement("div");
    myUploadsContainer.classList.add("my-uploads-container");
    if (myUploads.length === 0) {
      const noUploadsMessage = document.createElement("div");
      noUploadsMessage.textContent = "No uploads yet";
      noUploadsMessage.classList.add("no-uploads-message");
      myUploadsContainer.appendChild(noUploadsMessage);
    } else {
      myUploads.forEach(gifId => {
        const img = document.createElement("img");
        img.src = `https://media.giphy.com/media/${gifId}/giphy.gif`;
        const gifContainer = document.createElement("div");
        gifContainer.classList.add("gif-container");
        gifContainer.appendChild(img);

        gifContainer.addEventListener("click", () => {
          displayGifDetails(gifId);
        });

        myUploadsContainer.appendChild(gifContainer);
      });
    }
    const container = document.getElementById("container");
    container.innerHTML = "";
    container.appendChild(myUploadsContainer);
  } else {
    const noUploadsMessage = document.createElement("div");
    noUploadsMessage.textContent = "No uploads yet";
    noUploadsMessage.classList.add("no-uploads-message");
    const myUploadsContainer = document.createElement("div");
    myUploadsContainer.classList.add("my-uploads-container");
    myUploadsContainer.appendChild(noUploadsMessage);
    const container = document.getElementById("container");
    container.innerHTML = "";
    container.appendChild(myUploadsContainer);
  }
}