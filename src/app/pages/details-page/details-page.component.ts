import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Film } from '../../models/film.model';
import { extractFilmData } from '../../utils/tmdb.util';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private location = inject(Location);
  private platformId = inject(PLATFORM_ID);

  film?: Film;

  ngOnInit(): void {
    // get TMDB id for film from params
    this.route.paramMap.subscribe((pm) => {
      const id = Number(pm.get('id'));
      if (!Number.isFinite(id)) return;

      // make get request to TMDB to get film details
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${environment.tmdbKey}&append_to_response=videos`;
      this.http.get<any>(url).subscribe({
        next: (res) => (this.film = extractFilmData(res)),
        error: (err) => console.error('Error fetching film details:', err),
      });
    });
  }
}
