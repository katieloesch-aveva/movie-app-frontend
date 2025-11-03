import {
  Component,
  Input,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Film } from '../../models/film.model';
import { WatchedService } from '../../services/watched.service';

@Component({
  selector: 'app-btn-watched',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-watched.component.html',
  styleUrl: './btn-watched.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnWatchedComponent {
  @Input({ required: true }) film!: Film;

  private watched = inject(WatchedService);
  ids$: Observable<Set<number>> = this.watched.ids$;

  toggle() {
    this.watched.toggle(this.film);
  }

  remove() {
    this.watched.remove(this.film.id);
  }

  add() {
    this.watched.add(this.film);
  }
}
