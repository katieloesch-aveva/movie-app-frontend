import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Film } from '../../models/film.model';
import { WatchedService } from '../../services/watched.service';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-btn-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-add.component.html',
  styleUrl: './btn-add.component.scss',
})
export class BtnAddComponent {
  @Input({ required: true }) item!: Film;
  @Input() itemLocation: 'watchlist' | 'watched' = 'watchlist';

  private watchlist = inject(WatchlistService);
  private watched = inject(WatchedService);

  get ids$(): Observable<Set<number>> {
    return this.itemLocation === 'watchlist'
      ? this.watchlist.ids$
      : this.watched.ids$;
  }

  private get service() {
    return this.itemLocation === 'watchlist' ? this.watchlist : this.watched;
  }

  toggle() {
    this.service.toggle(this.item);
  }

  remove() {
    this.service.remove(this.item.id);
  }

  add() {
    this.service.add(this.item);
  }

  get addLabel(): string {
    return this.itemLocation === 'watchlist' ? 'Watchlist  +' : 'Watched  +';
  }

  get removeLabel(): string {
    return this.itemLocation === 'watchlist'
      ? 'Remove from Watchlist'
      : 'Remove from Watched';
  }

  get buttonClass(): string {
    return this.itemLocation === 'watchlist' ? 'btn-watchlist' : 'btn-watched';
  }
}
