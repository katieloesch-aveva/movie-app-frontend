import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchlistService } from '../../services/watchlist.service';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './watchlist-page.component.html',
  styleUrl: './watchlist-page.component.scss',
})
export class WatchlistPageComponent {
  svc = inject(WatchlistService);

  // avoid re-rendering identical cards
  trackById = (_: number, f: { id: number }) => f.id;
}
