import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV !== 'development' 
  ? 'https://api.mangadex.org' 
  : 'http://localhost:3030';

const PROVIDER = 'manga/mangadex/read';

const useMangaChapter = create((set) => ({
  chapter: '',
  Pages: [],
  isLoading: false,
  error: null,

  SetChapter: async (chapterId) => {
    set({ chapter: chapterId, isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/${PROVIDER}/${chapterId}`);
      set({ Pages: response?.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching pages:', error);
      set({ Pages: [], isLoading: false, error: error.message });
    }
  },
}));

export default useMangaChapter;
