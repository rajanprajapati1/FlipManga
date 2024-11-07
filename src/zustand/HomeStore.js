import { create } from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware';

const API_BASE_URL = process.env.NODE_ENV !== 'development'
  ? 'https://consumet-api-fork-three.vercel.app'
  : 'http://localhost:3030';

const PROVIDER = '/meta/anilist';
const endpoints = {
  trending: `${API_BASE_URL + PROVIDER}/trending`,
  popular: `${API_BASE_URL + PROVIDER}/popular`,
  randomAnime: `${API_BASE_URL + PROVIDER}/random-anime`,
  latest: `${API_BASE_URL + PROVIDER}/airing-schedule`,
};

const useHomeStore = create(
  persist(
    (set) => ({
      trending: {
        data: [],
        loading: false,
        error: null,
      },
      popular: {
        data: [],
        loading: false,
        error: null,
      },
      randomAnime: {
        data: {},
        loading: false,
        error: null,
      },
      latest: {
        data: [],
        loading: false,
        error: null,
      },

      // Fetch data concurrently on mount
      fetchAllData: async () => {
        set({
          trending: { data: [], loading: true, error: null },
          popular: { data: [], loading: true, error: null },
          randomAnime: { data: {}, loading: true, error: null },
          latest: { data: [], loading: true, error: null },
        });

        try {
          // Always fetch new data from the API
          const fetchTrending = axios.get(endpoints.trending).then((res) => res.data);
          const fetchPopular = axios.get(endpoints.popular).then((res) => res.data);
          const fetchRandomAnime = axios.get(endpoints.randomAnime).then((res) => res.data);
          const fetchLatest = axios.get(endpoints.latest).then((res) => res.data);

          const [trendingData, popularData, randomAnimeData, latestData] = await Promise.all([
            fetchTrending,
            fetchPopular,
            fetchRandomAnime,
            fetchLatest,
          ]);

          // Update state with fresh data
          set({
            trending: { data: trendingData?.results, loading: false, error: null },
            popular: { data: popularData?.results, loading: false, error: null },
            randomAnime: { data: randomAnimeData, loading: false, error: null },
            latest: { data: latestData?.results, loading: false, error: null },
          });
        } catch (error) {
          set({
            trending: { data: [], loading: false, error: error.message },
            popular: { data: [], loading: false, error: error.message },
            randomAnime: { data: {}, loading: false, error: error.message },
            latest: { data: [], loading: false, error: error.message },
          });
        }
      },

      // Fetch individual sections if needed
      fetchTrending: async () => {
        set({ trending: { data: [], loading: true, error: null } });
        try {
          const response = await axios.get(endpoints.trending);
          set({
            trending: { data: response.data?.results, loading: false, error: null },
          });
        } catch (error) {
          set({ trending: { data: [], loading: false, error: error.message } });
        }
      },

      fetchPopular: async () => {
        set({ popular: { data: [], loading: true, error: null } });
        try {
          const response = await axios.get(endpoints.popular);
          set({
            popular: { data: response.data?.results, loading: false, error: null },
          });
        } catch (error) {
          set({ popular: { data: [], loading: false, error: error.message } });
        }
      },

      fetchRandomAnime: async () => {
        set({ randomAnime: { data: {}, loading: true, error: null } });
        try {
          const response = await axios.get(endpoints.randomAnime);
          set({
            randomAnime: { data: response.data, loading: false, error: null },
          });
        } catch (error) {
          set({ randomAnime: { data: {}, loading: false, error: error.message } });
        }
      },

      fetchLatest: async () => {
        set({ latest: { data: [], loading: true, error: null } });
        try {
          const response = await axios.get(endpoints.latest);
          set({
            latest: { data: response.data?.results, loading: false, error: null },
          });
        } catch (error) {
          set({ latest: { data: [], loading: false, error: error.message } });
        }
      },
    }),
    {
      name: 'home-store', // name for localStorage persistence
      getStorage: () => localStorage, // specify where to store data (localStorage or sessionStorage)
    }
  )
);

export default useHomeStore;
