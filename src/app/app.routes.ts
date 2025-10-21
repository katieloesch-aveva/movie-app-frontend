import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { WatchlistPageComponent } from './pages/watchlist-page/watchlist-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'Home' },
  { path: 'watchlist', component: WatchlistPageComponent, title: 'Watchlist' },
  { path: 'details/:id', component: DetailsPageComponent, title: 'Details' },
];
