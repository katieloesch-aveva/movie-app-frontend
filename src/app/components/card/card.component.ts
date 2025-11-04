import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { Film } from '../../models/film.model';
import { WatchlistService } from '../../services/watchlist.service';
import { WatchedService } from '../../services/watched.service';
import { BtnWatchlistComponent } from '../btn-watchlist/btn-watchlist.component';
import { BtnEditComponent } from '../btn-edit/btn-edit.component';
import { ModalComponent } from '../modal/modal.component';
import { BtnWatchedComponent } from '../btn-watched/btn-watched.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BtnWatchlistComponent,
    BtnWatchedComponent,
    BtnEditComponent,
    ModalComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  private router = inject(Router);
  public watchlist = inject(WatchlistService);
  public watched = inject(WatchedService);

  @Input({ required: true }) film!: Film;

  placeholderSrc = 'assets/placeholder-img.png';
  showModal = false;

  watchlistIds$: Observable<Set<number>> = this.watchlist.ids$;
  watchedIds$: Observable<Set<number>> = this.watched.ids$;

  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  isInWatchlist$(filmId: number) {
    return this.watchlist.isInWatchlist$(filmId);
  }

  isInWatched$(filmId: number) {
    return this.watched.isInWatched$(filmId);
  }

  openModal(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
