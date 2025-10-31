import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Film } from '../models/film.model';
import { extractFilmData } from '../utils/tmdb.util';
import { environment } from '../../environments/environment';

const LS_KEY = 'watchlist';
const isBrowser = typeof window !== 'undefined' && !!window.localStorage;

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private _store = new BehaviorSubject<Film[]>(this.loadInitial());

  readonly watchlist$ = this._store.asObservable().pipe(distinctUntilChanged());
  readonly ids$: Observable<Set<number>> = this.watchlist$.pipe(
    map((list) => new Set(list.map((f) => Number(f.id))))
  );

  constructor(private http: HttpClient) {}

  // ------------------- Core Add / Remove / Update -------------------

  /**
   * Add a film to the watchlist.
   * - If the film was user-entered, it’s saved directly.
   * - If the film is from TMDB (id only), it first fetches full details.
   */
  async add(film: Film | { id: number; source?: string }) {
    const list = this._store.value;
    const exists = list.some((f) => f.id === film.id);
    if (exists) return;

    let fullFilm: Film = film as Film;

    // if it’s a TMDB film with limited data, fetch full details
    if (!('title' in film) || film.source === 'tmdb') {
      try {
        const fetched = await this.fetchTmdbFilmById(Number(film.id));
        fullFilm = fetched;
      } catch (err) {
        console.error('❌ Failed to fetch TMDB film details:', err);
        return;
      }
    }

    // mark source if not set
    (fullFilm as any).source = (film as any).source ?? 'user';

    this.save([...list, fullFilm]);
  }

  /** Remove film by id */
  remove(id: number) {
    this.save(this._store.value.filter((f) => f.id !== id));
  }

  /** Toggle watchlist inclusion */
  async toggle(film: Film | { id: number; source?: string }) {
    const exists = this._store.value.some((f) => f.id === film.id);
    exists ? this.remove(Number(film.id)) : await this.add(film);
  }

  /** Update an existing film’s details */
  updateFilm(updated: Partial<Film> & { id: number }) {
    const next = this._store.value.map((f) =>
      f.id === updated.id ? { ...f, ...updated } : f
    );
    this.save(next);
  }

  // ------------------- Access Helpers -------------------

  /** Get a film by ID synchronously */
  getById(id: number): Film | undefined {
    return this._store.value.find((f) => f.id === id);
  }

  /** Reactive stream for a film by ID */
  getFilmById$(id: number): Observable<Film | undefined> {
    return this.watchlist$.pipe(map((list) => list.find((f) => f.id === id)));
  }

  /** Check if film is in watchlist (reactive) */
  isInWatchlist$(id: number): Observable<boolean> {
    return this.watchlist$.pipe(map((list) => list.some((f) => f.id === id)));
  }

  /** Check if film is in watchlist (sync) */
  isInWatchlistSync(id: number): boolean {
    return this._store.value.some((f) => f.id === id);
  }

  /** Clear entire watchlist */
  clear() {
    this.save([]);
  }

  // ------------------- Private Helpers -------------------

  /** Load from localStorage */
  private loadInitial(): Film[] {
    if (!isBrowser) return [];
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]');
    } catch {
      return [];
    }
  }

  /** Save to localStorage + BehaviorSubject */
  private save(list: Film[]) {
    if (isBrowser) {
      localStorage.setItem(LS_KEY, JSON.stringify(list));
    }
    this._store.next(list);
  }

  /** Fetch full TMDB film details */
  private async fetchTmdbFilmById(id: number): Promise<Film> {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${environment.tmdbKey}&append_to_response=videos`;
    const raw = await firstValueFrom(this.http.get<any>(url));
    const film = extractFilmData(raw);
    film.id = Number(film.id ?? id);
    (film as any).source = 'tmdb';
    return film;
  }
}
