/**
* Generates the HTML for the upload view page
* @function
* @returns {string} - The HTML string for the upload view page
*/
export const uploadView = () => `
 <div id="upload">
  <h1>Upload a GIF</h1>
  <form id="upload-form">
    <label for="fileInput">Choose a GIF to upload:</label>
    <input type="file" id="fileInput" name="gif-file" accept="image/gif" required>
    <br><br>
    <label for="tagsInput">Enter tags (separated by commas):</label>
    <input type="text" id="tagsInput" name="gif-tags" required>
    <br><br>
    <input type="submit" value="Upload">
  </form>
</div>
`;