import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV !== 'development'
  ? 'https://consumet-api-fork-three.vercel.app'
  : 'http://localhost:3030';

export const fetchMangaDetails = async (id, title) => {
  try {
    let url = `${API_BASE_URL}/manga/mangadex/info/`;
    let findUrl = `${API_BASE_URL}/manga/mangadex/`;

    // If neither id nor title is provided, throw an error
    if (!id && !title) throw new Error("Please provide an ID or a title!");

    if (id) {
      // Fetch manga details by ID
      url += `${id}`;
      const response = await axios.get(url);
      return response?.data; // Return manga data
    } else {
      // Fetch manga details by Title
      findUrl += `${title}`;
      const response = await axios.get(findUrl);
      return response?.data?.results?.[0]; // Return the first result
    }
  } catch (error) {
    console.error("Error fetching manga details:", error);
    throw new Error("Failed to fetch manga details");
  }
};
