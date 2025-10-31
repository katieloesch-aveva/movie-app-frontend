import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Film } from '../../models/film.model';
import { extractFilmData } from '../../utils/tmdb.util';
import { environment } from '../../../environments/environment';
import { WatchlistService } from '../../services/watchlist.service';
import { BtnWatchlistComponent } from '../../components/btn-watchlist/btn-watchlist.component';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule, BtnWatchlistComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  private watchlist = inject(WatchlistService);

  film?: Film;

  addToWatchlist(): void {
    if (this.film) this.watchlist.add(this.film);
  }

  removeFromWatchlist(): void {
    if (this.film) this.watchlist.remove(this.film.id);
  }

  ngOnInit(): void {
    // get dilm id for film from params
    this.route.paramMap.subscribe((pm) => {
      const id = Number(pm.get('id'));
      if (!Number.isFinite(id)) return;

      // check if film was entered by user or fetched from tmdb
      console.log('🔍 Route ID:', id);
      console.log('💾 Current watchlist:', this.watchlist['_store'].value);

      const localFilm = this.watchlist.getById(id);
      console.log('🎬 Found local film:', localFilm);

      console.log(localFilm);

      // if film was entered by user: display directly
      if (localFilm?.source === 'user') {
        this.film = localFilm;
        return;
      }

      // if film was fetched from TMDB film → fetch film details from TMDB

      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${environment.tmdbKey}&append_to_response=videos`;
      this.http.get<any>(url).subscribe({
        next: (res) => (this.film = extractFilmData(res)),
        error: (err) => console.error('Error fetching film details:', err),
      });
      return;
    });
  }
}
