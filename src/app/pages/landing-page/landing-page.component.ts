import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { extractFilmData } from '../../utils/tmdb.util';
import { Film } from '../../models/film.model';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  private http = inject(HttpClient);

  trendingFilms: any[] = [];

  private tmdbKey = environment.tmdbKey;
  private tmdbUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.tmdbKey}&append_to_response=videos`;

  ngOnInit(): void {
    this.fetchTrendingFilms();
  }

  fetchTrendingFilms(): void {
    this.http.get<any>(this.tmdbUrl).subscribe({
      next: (res) => {
        const results = Array.isArray(res?.results) ? res.results : [];
        // console.log(results);
        this.trendingFilms = results.map((r: any) => extractFilmData(r));
      },
      error: (err) => console.error('Error fetching trending films:', err),
    });
  }
}
