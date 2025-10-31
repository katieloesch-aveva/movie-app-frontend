import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { take } from 'rxjs/operators';

import { Film } from '../../models/film.model';
import { TMDB_GENRES_MOVIES } from '../../utils/tmdb.util';
import { WatchlistService } from '../../services/watchlist.service';

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
  selector: 'app-edit-film-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-film-page.component.html',
  styleUrl: './edit-film-page.component.scss',
})
export class EditFilmPageComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private watchlist = inject(WatchlistService);

  filmForm!: FormGroup;
  filmId!: number;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  genresList = Object.values(TMDB_GENRES_MOVIES).sort();

  ngOnInit(): void {
    this.buildForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.errorMessage = 'Missing film ID.';
      return;
    }

    this.filmId = Number(idParam);
    const film = this.watchlist.getById(this.filmId);
    if (!film) {
      this.errorMessage = 'Film not found in your watchlist.';
      return;
    }

    this.patchFormWithFilm(film);
  }

  ngOnDestroy(): void {}

  private buildForm() {
    this.filmForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      release: ['', [Validators.required]],
      runtime: [null, [Validators.min(1)]],
      synopsis: ['', [Validators.required, Validators.minLength(10)]],
      poster_url: ['', [imageUrlValidator()]],
      newGenre: [''],
      genre: this.fb.array<string>([]),
    });
  }

  get f() {
    return this.filmForm.controls;
  }

  get genre(): FormArray {
    return this.filmForm.get('genre') as FormArray;
  }

  addGenre(valueFromSelect?: string) {
    const typed = (this.f['newGenre'].value ?? '').toString().trim();
    const fromSelect = (valueFromSelect ?? '').toString().trim();
    const candidate = typed || fromSelect;
    if (!candidate) return;

    const exists = (this.genre.value as string[]).some(
      (g) => g.toLowerCase() === candidate.toLowerCase()
    );
    if (!exists) {
      this.genre.push(this.fb.control(candidate));
    }
    this.f['newGenre'].setValue('');
  }

  removeGenre(i: number) {
    this.genre.removeAt(i);
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.filmForm.invalid) {
      this.errorMessage = 'Please fix validation errors before saving.';
      return;
    }

    const v = this.filmForm.value;
    const updated: Partial<Film> & { id: number } = {
      id: this.filmId,
      title: v.title,
      release: v.release,
      runtime: Number(v.runtime) || undefined,
      synopsis: v.synopsis,
      poster_url: v.poster_url,
      genre: v.genre as string[],
    };

    try {
      this.watchlist.updateFilm(updated);
      this.successMessage = 'Film updated successfully!';
      setTimeout(() => this.router.navigate(['/details', this.filmId]), 800);
    } catch (err: any) {
      this.errorMessage = err?.message ?? 'Failed to update film.';
    }
  }

  private patchFormWithFilm(film: Film) {
    this.filmForm.patchValue({
      title: film.title ?? '',
      release: this.asInputDate(
        (film as any).release ?? (film as any).release_date
      ),
      runtime:
        typeof (film as any).runtime === 'number'
          ? (film as any).runtime
          : null,
      synopsis: (film as any).synopsis ?? (film as any).overview ?? '',
      poster_url: film.poster_url ?? '',
      newGenre: '',
    });

    this.genre.clear();
    const genres =
      ((film as any).genre as string[]) ??
      ((film as any).genres as string[]) ??
      [];
    genres.forEach((g) => this.genre.push(this.fb.control(g)));
  }

  private asInputDate(value: any): string {
    if (!value) return '';
    const d = new Date(value);
    return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
  }
}
