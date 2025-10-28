import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Film } from '../../models/film.model';
// import { mockData } from '../landing-page/landing-page.component';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  film: Film | undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.film = mockData.find((f) => f.id === id);
    // console.log('Loaded film:', this.film);
  }
}
