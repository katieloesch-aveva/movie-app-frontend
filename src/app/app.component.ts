import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MovieApiService } from './services/movie-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'movie-master';

  apiMovies: any[] = [];
  movieApiService = inject(MovieApiService);

  constructor() {
    this.movieApiService.get().subscribe((movies) => {
      this.apiMovies = movies;
    });
  }
}
