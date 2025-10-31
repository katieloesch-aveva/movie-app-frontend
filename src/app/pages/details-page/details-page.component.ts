import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Film } from '../../models/film.model';
import { WatchlistService } from '../../services/watchlist.service';
import { BtnWatchlistComponent } from '../../components/btn-watchlist/btn-watchlist.component';
import { BtnEditComponent } from '../../components/btn-edit/btn-edit.component';
import { environment } from '../../../environments/environment';
import { extractFilmData } from '../../utils/tmdb.util';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    BtnWatchlistComponent,
    BtnEditComponent,
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  public watchlist = inject(WatchlistService);

  film?: Film;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((pm) => Number(pm.get('id'))),

        switchMap((id) => {
          if (!Number.isFinite(id)) return of<Film | undefined>(undefined);

          const fromWatchlist = this.watchlist.getById(id);
          if (fromWatchlist) return of(fromWatchlist);

          const params = new HttpParams()
            .set('api_key', environment.tmdbKey)
            .set('append_to_response', 'videos');

          return this.http
            .get<any>(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${environment.tmdbKey}&append_to_response=videos`
            )
            .pipe(map((tmdb) => extractFilmData(tmdb) as Film));
        })
      )
      .subscribe({
        next: (film) => (this.film = film),
        error: (err) => {
          console.error('Failed to load film', err);
          this.film = undefined;
        },
      });
  }

  addToWatchlist(): void {
    if (this.film) this.watchlist.add(this.film);
  }

  removeFromWatchlist(): void {
    if (this.film) this.watchlist.remove(this.film.id);
  }
}
