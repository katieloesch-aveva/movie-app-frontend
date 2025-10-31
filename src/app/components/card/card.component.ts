import { Component, Input, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { Film } from '../../models/film.model';
import { WatchlistService } from '../../services/watchlist.service';
import { BtnWatchlistComponent } from '../btn-watchlist/btn-watchlist.component';
import { BtnEditComponent } from '../btn-edit/btn-edit.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, CommonModule, BtnWatchlistComponent, BtnEditComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() film!: Film;
  watchlist = inject(WatchlistService);
  ids$: Observable<Set<number>> = this.watchlist.ids$;

  addToWatchlist() {
    this.watchlist.add(this.film);
  }

  removeFromWatchlist() {
    this.watchlist.remove(this.film.id);
  }

  toggleWatchlist() {
    this.watchlist.toggle(this.film);
  }
}
