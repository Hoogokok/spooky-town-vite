import { MovieListResponse } from '../types/movieResponses';

const BASE_URL = import.meta.env.VITE_MOVIE_API
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY

async function fetchMovies<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'X-API-Key': API_KEY
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export const movieApi = {
    fetchUpcomingMovies: async (): Promise<MovieListResponse[]> => {
        return fetchMovies<MovieListResponse[]>('/movies/theater/upcoming');
    },

    fetchNowPlayingMovies: async (): Promise<MovieListResponse[]> => {
        return fetchMovies<MovieListResponse[]>('/movies/theater/released');
    }
} 
