// src/types/movie.ts
export interface Movie {
    _id: string;
    title: string;
    description: string;
}



export interface MoviesData {
    movies: Movie[];
    error?: string;
}
