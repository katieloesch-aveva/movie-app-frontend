import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { CardComponent } from '../../components/card/card.component';
import { extractFilmData } from '../../utils/tmdb.util';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, CardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  searchForm: FormGroup;
  submitted = false;
  tvResults: any[] = [];
  filmResults: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({ title: [''] });
  }

  onSubmit(): void {
    this.submitted = true;
    const title: string = (this.searchForm.value.title || '').trim();

    this.tvResults = [];
    this.filmResults = [];

    if (!title) {
      this.searchForm.reset({ title: '' });
      return;
    }

    const url = 'https://api.themoviedb.org/3/search/movie';
    const tmdbKey = environment.tmdbKey;

    const params = new HttpParams()
      .set('api_key', tmdbKey)
      .set('append_to_response', 'videos')
      .set('language', 'en-US')
      .set('page', '1')
      .set('include_adult', 'false')
      .set('query', title);

    this.http.get<{ results: any[] }>(url, { params }).subscribe({
      next: (res) => {
        const queryResults = (res?.results || []).map((item) => ({
          ...item,
          media_type: 'movie',
          selected: false,
        }));
        this.filmResults = queryResults.map((r: any) => extractFilmData(r));

        // console.log(queryResults);
        this.searchForm.reset({ title: '' });
      },
      error: (err) => {
        console.error('TMDB search error:', err);
        this.searchForm.reset({ title: '' });
      },
    });
  }

  onReset(): void {
    this.searchForm.reset();
    this.tvResults = [];
    this.filmResults = [];
    this.submitted = false;
  }
}
