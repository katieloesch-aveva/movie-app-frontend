import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-new-film-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-film-page.component.html',
  styleUrl: './new-film-page.component.scss',
})
export class NewFilmPageComponent {
  filmForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.filmForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      release: ['', [Validators.required]],
      runtime: ['', [Validators.required, Validators.min(1)]],
      synopsis: ['', [Validators.required, Validators.minLength(10)]],
      genre: this.fb.array([]),
      newGenre: [''], // helper input for adding genres
    });
  }

  get f() {
    return this.filmForm.controls;
  }

  get genre(): FormArray {
    return this.filmForm.get('genre') as FormArray;
  }

  addGenre(): void {
    const newGenre = this.filmForm.get('newGenre')?.value?.trim();
    if (newGenre) {
      this.genre.push(this.fb.control(newGenre));
      this.filmForm.get('newGenre')?.reset();
    }
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

    const newFilm = {
      title: this.filmForm.value.title,
      release: this.filmForm.value.release,
      runtime: this.filmForm.value.runtime,
      synopsis: this.filmForm.value.synopsis,
      genre: this.genre.value,
    };

    console.log('🎬 New Film Added:', newFilm);

    this.successMessage = 'Film added successfully!';
    this.filmForm.reset();
    this.genre.clear();
    this.submitted = false;
  }
}
