import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Film } from '../../models/film.model';
import { WatchlistService } from '../../services/watchlist.service';
import { WatchedService } from '../../services/watched.service';
import { BtnWatchlistComponent } from '../btn-watchlist/btn-watchlist.component';
import { BtnWatchedComponent } from '../btn-watched/btn-watched.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, BtnWatchlistComponent, BtnWatchedComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input({ required: true }) film!: Film;
  @Output() closed = new EventEmitter<void>();

  private watchlist = inject(WatchlistService);
  private watched = inject(WatchedService);

  close() {
    this.closed.emit();
  }
}
