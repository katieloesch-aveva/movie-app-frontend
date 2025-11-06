import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Film } from '../../models/film.model';
import { WatchlistService } from '../../services/watchlist.service';
import { WatchedService } from '../../services/watched.service';
import { BtnAddComponent } from '../btn-add/btn-add.component';
import { BtnEditComponent } from '../btn-edit/btn-edit.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, BtnAddComponent, BtnEditComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input({ required: true }) film!: Film;
  @Output() closed = new EventEmitter<void>();

  public watchlist = inject(WatchlistService);
  public watched = inject(WatchedService);

  isInWatchlist$(id: number) {
    return this.watchlist.isInWatchlist$(id);
  }

  addToWatchlist(): void {
    if (this.film) this.watchlist.add(this.film);
  }
  removeFromWatchlist(): void {
    if (this.film) this.watchlist.remove(this.film.id);
  }

  isInWatched$(id: number) {
    return this.watched.isInWatched$(id);
  }

  addToWatched(): void {
    if (this.film) this.watched.add(this.film);
  }
  removeFromWathed(): void {
    if (this.film) this.watched.remove(this.film.id);
  }

  close() {
    this.closed.emit();
  }
}
