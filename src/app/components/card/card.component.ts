import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { Film } from '../../models/film.model';
import { WatchlistService } from '../../services/watchlist.service';
import { BtnWatchlistComponent } from '../btn-watchlist/btn-watchlist.component';
import { BtnEditComponent } from '../btn-edit/btn-edit.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BtnWatchlistComponent,
    BtnEditComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  private router = inject(Router);
  private watchlist = inject(WatchlistService);

  @Input({ required: true }) film!: Film;

  // observable of IDs in watchlist
  ids$: Observable<Set<number>> = this.watchlist.ids$;

  // navigate to film details
  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  // determines if a film is in the watchlist (async observable)
  isInWatchlist$(filmId: number) {
    return this.watchlist.isInWatchlist$(filmId);
  }
}
