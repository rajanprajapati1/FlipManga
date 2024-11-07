import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV !== 'development'
  ? 'https://consumet-api-fork-three.vercel.app'
  : 'http://localhost:3030';

// State store for manga details
const useMangaDetailStore = create((set) => ({
  mangaDetails: null,
  loading: false,
  error: null,
  fetchMangaDetails: async (id, title) => {
    set({ loading: true, error: null });
    try {
      let url = `${API_BASE_URL}/manga/mangadex/info/`;
      let findurl = `${API_BASE_URL}/manga/mangadex/`;
      if (!id && !title) throw new Error("Please Provide Id or Title !!")
      if (id) {
        url += `${id}`;
        const response = await axios.get(url);
        set({ mangaDetails: response?.data, loading: false });
      } else {
        findurl += `${title}`;
        const response = await axios.get(findurl);
        set({ mangaDetails: response?.data?.results?.[0], loading: false });
      }
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error('Error fetching manga details:', error);
    }
  },
}));

export default useMangaDetailStore;
