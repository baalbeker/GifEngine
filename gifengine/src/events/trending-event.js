import { API_KEY } from "../common/constants.js";

/**
Fetches trending GIFs from the Giphy API.
@async
@returns {Array} An array of trending GIF data objects.
*/

export const trendingLoad = async () => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=40`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error with displaying trending gifs:", error);
    return [];
  }
};