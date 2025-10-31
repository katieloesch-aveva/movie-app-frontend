import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Film } from '../../models/film.model';
import { WatchlistService } from '../../services/watchlist.service';
import { BtnWatchlistComponent } from '../../components/btn-watchlist/btn-watchlist.component';
import { BtnEditComponent } from '../../components/btn-edit/btn-edit.component';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule, BtnWatchlistComponent, BtnEditComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public watchlist = inject(WatchlistService);

  film?: Film;

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm) => {
      const idParam = pm.get('id');
      const id = Number(idParam);
      if (!Number.isFinite(id)) {
        this.film = undefined;
        return;
      }

      this.film = this.watchlist.getById(id);
    });
  }

  addToWatchlist(): void {
    if (this.film) this.watchlist.add(this.film);
  }

  removeFromWatchlist(): void {
    if (this.film) this.watchlist.remove(this.film.id);
  }
}
