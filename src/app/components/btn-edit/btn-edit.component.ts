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

  @Input({ required: true }) film!: { id: string | number };

  goToEdit(): void {
    if (this.film?.id != null) {
      this.router.navigate(['/film/edit', this.film.id]);
    }
  }
}
