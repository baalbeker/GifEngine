import { API_KEY } from "../common/constants.js";

/**
Sets up the upload form and handles form submission to upload a GIF to Giphy.
@returns {void}
*/

export const uploadFunc = () => {
  const form = document.getElementById("upload-form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const tagsInput = document.getElementById("tagsInput");
    const file = fileInput.files[0];
    const tags = tagsInput.value.split(",").map(tag => tag.trim());
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", API_KEY);
    formData.append("tags", tags.join(","));

    fetch("https://upload.giphy.com/v1/gifs", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        const doneMessage = document.createElement("div");
        doneMessage.textContent = "Done!";
        const uploadForm = document.getElementById("upload-form");
        uploadForm.parentNode.insertBefore(doneMessage, uploadForm.nextSibling);

        const uploadedGifId = data.data.id;
        const myUploads = JSON.parse(localStorage.getItem("myUploads")) || [];
        myUploads.push(uploadedGifId);
        localStorage.setItem("myUploads", JSON.stringify(myUploads));
      })
      .catch(error => console.error("Error:", error));
  });
};