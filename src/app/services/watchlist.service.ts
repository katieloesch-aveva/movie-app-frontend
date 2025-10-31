import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Film } from '../models/film.model';

const LS_KEY = 'watchlist';
const isBrowser = typeof window !== 'undefined' && !!window.localStorage;

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private readonly _store = new BehaviorSubject<Film[]>(this.loadInitial());

  private loadInitial(): Film[] {
    if (!isBrowser) return [];
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]');
    } catch {
      return [];
    }
  }

  private save(list: Film[]) {
    if (isBrowser) {
      localStorage.setItem(LS_KEY, JSON.stringify(list));
    }
    this._store.next(list);
  }

  readonly watchlist$ = this._store.asObservable().pipe(distinctUntilChanged());
  readonly ids$ = this.watchlist$.pipe(
    map((list) => new Set(list.map((f) => f.id)))
  );

  add(film: Film) {
    const list = this._store.value;
    if (list.some((f) => f.id === film.id)) return;
    this.save([...list, film]);
  }

  remove(id: number) {
    this.save(this._store.value.filter((f) => f.id !== id));
  }

  toggle(film: Film) {
    const exists = this._store.value.some((f) => f.id === film.id);
    exists ? this.remove(film.id) : this.add(film);
  }

  getById(id: number): Film | undefined {
    return this._store.value.find((f) => f.id === id || f.tmdbId === id);
  }

  clear() {
    this.save([]);
  }
}
