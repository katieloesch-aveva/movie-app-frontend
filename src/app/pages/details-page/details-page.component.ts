import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Film } from '../../models/film.model';
import { WatchlistService } from '../../services/watchlist.service';
import { WatchedService } from '../../services/watched.service';
import { extractFilmData } from '../../utils/tmdb.util';
import { BtnAddComponent } from '../../components/btn-add/btn-add.component';
import { BtnEditComponent } from '../../components/btn-edit/btn-edit.component';
import { VideoModalComponent } from '../../components/video-modal/video-modal.component';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    BtnAddComponent,
    BtnEditComponent,
    VideoModalComponent,
  ],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  public watchlist = inject(WatchlistService);
  public watched = inject(WatchedService);

  showVideoModal = false;

  film: Film | undefined;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((pm) => Number(pm.get('id'))),
        switchMap((id) => {
          if (!Number.isFinite(id)) return of<Film | undefined>(undefined);

          // check if film is in watchlist/watched
          const fromWatchlist = this.watchlist.getById(id);
          const fromWatched = this.watched.getById(id);
          if (fromWatchlist) return of(fromWatchlist);
          if (fromWatched) return of(fromWatched);

          // if film is not in watchlist/watched fetch details from TMDB API
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

  isInWatchlist$(id: number) {
    return this.watchlist.isInWatchlist$(id);
  }

  addToWatchlist(): void {
    if (this.film) this.watchlist.add(this.film);
  }
  removeFromWatchlist(): void {
    if (this.film) this.watchlist.remove(this.film.id);
  }

  isInWatched$(id: number) {
    return this.watched.isInWatched$(id);
  }

  addToWatched(): void {
    if (this.film) this.watched.add(this.film);
  }
  removeFromWathed(): void {
    if (this.film) this.watched.remove(this.film.id);
  }

  openVideoModal(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.showVideoModal = true;
  }

  closeModal() {
    this.showVideoModal = false;
  }
}
