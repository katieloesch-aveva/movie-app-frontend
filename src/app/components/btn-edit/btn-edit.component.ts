import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-btn-edit',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './btn-edit.component.html',
  styleUrl: './btn-edit.component.scss',
})
export class BtnEditComponent {
  constructor(private router: Router) {}

  @Input({ required: true }) item!: { id: string | number };
  @Input() url: string = '/film/edit';
  @Input() itemLocation: 'watchlist' | 'watched' = 'watchlist';

  goToEdit(): void {
    if (this.item?.id != null) {
      this.router.navigate([this.url, this.item.id, this.itemLocation]);
    }
  }
}
