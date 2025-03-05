import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTJlZjA4NmEzMWVlY2RhZGExODVhYmJkNTY3ZWQzOCIsIm5iZiI6MTc0MTE5MDUzMy41MDEsInN1YiI6IjY3Yzg3NTg1M2RlMzA0MjFiN2MyYWRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7WuVC2jUp0V7XbZnysA-SR54nsb9VrT4TITKtO-mkLE";
const BASE_URL = "https://api.themoviedb.org/3/authentication";

const unsplashAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const searchPhotos = async (query, page = 1, perPage = 12) => {
  try {
    const response = await unsplashAPI.get("/search/photos", {
      params: {
        query,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.errors?.[0] || "Failed to fetch photos"
    );
  }
};
