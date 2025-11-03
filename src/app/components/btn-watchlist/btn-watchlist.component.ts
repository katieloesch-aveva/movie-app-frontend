import {
  Component,
  Input,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Film } from '../../models/film.model';
import { WatchlistService } from '../../services/watchlist.service';

@Component({
  selector: 'app-btn-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-watchlist.component.html',
  styleUrl: './btn-watchlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnWatchlistComponent {
  @Input({ required: true }) film!: Film;

  private watchlist = inject(WatchlistService);
  ids$: Observable<Set<number>> = this.watchlist.ids$;

  toggle() {
    this.watchlist.toggle(this.film);
  }

  remove() {
    this.watchlist.remove(this.film.id);
  }

  add() {
    this.watchlist.add(this.film);
  }
}
