export interface Film {
  id: number;
  title: string;
  release?: Date;
  runtime?: number;
  synopsis?: string;
  genre?: string[];
  poster_url?: string;
  source: 'tmdb' | 'user';
  tmdbId?: number;
}
