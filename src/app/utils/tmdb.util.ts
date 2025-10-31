import { Film } from '../models/film.model';

export const IMG_BASE = 'https://image.tmdb.org/t/p';
export const IMG_WIDTH = 500;

export const TMDB_GENRES_MOVIES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const TMDB_GENRES_TV: Record<number, string> = {
  10759: 'Action & Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  10762: 'Kids',
  9648: 'Mystery',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
  37: 'Western',
};

export function getPosterUrl(poster_path?: string, poster_link?: string) {
  return poster_path
    ? `https://image.tmdb.org/t/p/w${IMG_WIDTH}${poster_path}`
    : poster_link ?? '../assets/placeholder-img.png';
}

export function extractFilmData(raw: any): Film {
  return {
    id: raw.id,
    tmdbId: raw.id,
    source: 'tmdb',
    title: raw.title ?? raw.original_title ?? 'Untitled',
    runtime: raw.runtime ?? undefined,
    release: raw.release_date ? new Date(raw.release_date) : undefined,
    synopsis: raw.overview ?? undefined,
    genre: Array.isArray(raw.genre_ids)
      ? raw.genre_ids
          .map((id: number) => TMDB_GENRES_MOVIES[id])
          .filter(Boolean)
      : Array.isArray(raw.genres)
      ? raw.genres.map((g: any) => g.name)
      : undefined,
    poster_url: getPosterUrl(raw.poster_path || raw.poster_link),
  };
}
