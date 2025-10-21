import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
import { Film } from '../../models/film.model';

export const mockData: Film[] = [
  {
    id: 0,
    title: 'Alien',
    release: new Date('1979-01-01'),
    runtime: 117,
    synopsis:
      'During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet. When a three-member team of the crew discovers a chamber containing thousands of eggs on the planet, a creature inside one of the eggs attacks an explorer. The entire crew is unaware of the impending nightmare set to descend upon them when the alien parasite planted inside its unfortunate host is birthed.',
    genre: ['horror', 'science fiction'],
  },
  {
    id: 1,
    title: 'The Thing',
    release: new Date('1982-01-01'),
    runtime: 109,
    synopsis:
      'A twelve-man team at a remote Antarctic research station discovers an alien buried in the snow for over 100,000 years. Soon unfrozen, the form-changing creature wreaks havoc, creates terror… And becomes one of them',
    genre: ['horror', 'science fiction'],
  },
  {
    id: 2,
    title: 'Eternal Sunshine of the Spotless Mind',
    release: new Date('2004-01-01'),
    runtime: 108,
    synopsis:
      'Joel Barish, heartbroken that his girlfriend underwent a procedure to erase him from her memory, decides to do the same. However, as he watches his memories of her fade away, he realises that he still loves her, and may be too late to correct his mistake.',
    genre: ['science fiction', 'romance', 'drama'],
  },
  {
    id: 3,
    title: 'Seven',
    release: new Date('1995-01-01'),
    runtime: 127,
    synopsis:
      'Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the “seven deadly sins” in this dark and haunting film that takes viewers from the tortured remains of one victim to the next. The seasoned Det. Somerset researches each sin in an effort to get inside the killer’s mind, while his novice partner, Mills, scoffs at his efforts to unravel the case.',
    genre: ['mystery', 'crime', 'thriller'],
  },
  {
    id: 4,
    title: 'Everything Everywhere All at Once',
    release: new Date('2002-01-01'),
    runtime: 140,
    synopsis:
      'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what’s important to her by connecting with the lives she could have led in other universes.',
    genre: ['science fiction', 'comedy', 'action', 'adventure'],
  },
];

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  // httpClient = inject(HttpClient);
  data: Film[] = [];

  ngOnInit(): void {
    this.data = mockData;
    // console.log('mockdata: ', mockData);
  }

  // fetchData() {
  //   this.httpClient.get<Film[]>('').subscribe((data) => {
  //     console.log(data);
  //     this.data = data;
  //   });
  // }
}
