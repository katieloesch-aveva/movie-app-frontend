import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from '../../components/card/card.component';
import { WatchedService } from '../../services/watched.service';

@Component({
  selector: 'app-watched-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './watched-page.component.html',
  styleUrl: '../watchlist-page/watchlist-page.component.scss',
})
export class WatchedPageComponent {
  svc = inject(WatchedService);

  // avoid re-rendering identical cards
  trackById = (_: number, f: { id: number }) => f.id;
}
