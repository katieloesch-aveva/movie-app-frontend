import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  ValidatorFn,
  FormArray,
} from '@angular/forms';

import { WatchlistService } from '../../services/watchlist.service';
import { Film } from '../../models/film.model';
import { TMDB_GENRES_MOVIES } from '../../utils/tmdb.util';

function imageUrlValidator(): ValidatorFn {
  const re =
    /^(https?:\/\/[^\s]+|data:image\/[a-zA-Z]+;base64,[^\s]+|file:\/\/[^\s]+)$/i;

  return (control: AbstractControl): ValidationErrors | null => {
    const v = (control.value ?? '').toString().trim();
    if (!v) return null; // empty is valid; use 'required' separately
    return re.test(v) ? null : { imageUrl: true };
  };
}

@Component({
  selector: 'app-new-film-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-film-page.component.html',
  styleUrl: './new-film-page.component.scss',
})
export class NewFilmPageComponent {
  private fb = inject(FormBuilder);
  private watchlist = inject(WatchlistService);
  genresList = Object.values(TMDB_GENRES_MOVIES).sort();

  filmForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    release: ['', [Validators.required]],
    runtime: [null as number | null, [Validators.required, Validators.min(1)]],
    synopsis: ['', [Validators.required, Validators.minLength(10)]],
    genre: this.fb.array<string>([]),
    newGenre: [''],
    selectedGenre: [''],
    poster_url: ['', [imageUrlValidator()]],
  });

  submitted = false;
  successMessage = '';
  errorMessage = '';

  get f() {
    return this.filmForm.controls;
  }
  get genre(): FormArray {
    return this.filmForm.get('genre') as FormArray;
  }

  addGenre(fromDropdown?: string): void {
    const inputVal = (this.filmForm.get('newGenre')?.value ?? '').trim();
    const value = (fromDropdown || inputVal).trim();
    if (!value) return;

    const exists = (this.genre.value as string[]).some(
      (g) => g.toLowerCase() === value.toLowerCase()
    );
    if (!exists) this.genre.push(this.fb.control<string>(value));

    this.filmForm.get('newGenre')?.reset('');
    this.filmForm.get('selectedGenre')?.reset('');
  }

  removeGenre(index: number): void {
    this.genre.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.filmForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    const v = this.filmForm.value as {
      title: string;
      release: string;
      runtime: number | null;
      synopsis: string;
      genre: string[];
      poster_url?: string;
    };

    // generate film object that matches Film model
    const film: Film = {
      id: Date.now(),
      source: 'user',
      title: v.title.trim(),
      release: v.release ? new Date(v.release) : undefined,
      runtime: v.runtime ?? undefined,
      synopsis: v.synopsis.trim(),
      genre: Array.isArray(v.genre) ? v.genre : [],
      poster_url: v.poster_url?.trim() || undefined,
    };

    try {
      console.log('adding film...');
      console.log(film);
      console.log('*********');
      this.watchlist.add(film);
      this.successMessage = 'Film added to watchlist';

      // reset form
      this.filmForm.reset({
        title: '',
        release: '',
        runtime: null,
        synopsis: '',
        newGenre: '',
        selectedGenre: '',
        poster_url: '',
      });
      this.genre.clear();
      this.submitted = false;
    } catch {
      this.errorMessage = 'Could not add film. Please try again.';
    }
  }
}
