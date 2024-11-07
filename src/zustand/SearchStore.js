import { create } from 'zustand';
import axios from 'axios';
import debounce from 'lodash.debounce';

const API_BASE_URL = process.env.NODE_ENV !== 'development' 
  ? `https://consumet-api-fork-three.vercel.app` 
  : `http://localhost:3030`;

const PROVIDER = `manga/mangadex`;

const useSearchStore = create((set, get) => ({
  query: '',
  suggestions: [],
  isLoading: false,

  setQuery: (query) => {
    set({ query });
    get().debouncedFetchSuggestions(query);
  },

  fetchSuggestions: async (query) => {
    if (query?.trim() === '') {
      set({ suggestions: [], isLoading: false });
      return;
    }

    set({ isLoading: true });

    try {
      const response = await axios.get(`${API_BASE_URL}/${PROVIDER}/${query}`);
      set({ suggestions: response &&  response?.data?.results?.map((result) => result), isLoading: false });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      set({ suggestions: [], isLoading: false });
    }
  },

  debouncedFetchSuggestions: debounce((query) => {
    get().fetchSuggestions(query);
  }, 500)
}));

export default useSearchStore;