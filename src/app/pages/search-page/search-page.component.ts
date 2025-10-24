import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  searchForm: FormGroup;
  submitted = false;
  films: any[] = [];

  mockFilms = [
    {
      title: 'Inception',
      release: new Date(2010, 1, 1),
      genre: ['Action', 'Sci-Fi'],
    },
    {
      title: 'The Matrix',
      release: new Date(1999, 1, 1),
      genre: ['Action', 'Sci-Fi'],
    },
    {
      title: 'Interstellar',
      release: new Date(2014, 1, 1),
      genre: ['Adventure', 'Drama'],
    },
    {
      title: 'Tenet',
      release: new Date(2020, 1, 1),
      genre: ['Action', 'Thriller'],
    },
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      title: [''],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    const title = this.searchForm.value.title?.trim().toLowerCase();

    if (!title) {
      this.films = [];
      return;
    }

    // Simple search by title substring
    this.films = this.mockFilms.filter((film) =>
      film.title.toLowerCase().includes(title)
    );
  }

  onReset(): void {
    this.searchForm.reset();
    this.films = [];
    this.submitted = false;
  }
}
