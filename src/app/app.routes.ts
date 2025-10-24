import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { WatchlistPageComponent } from './pages/watchlist-page/watchlist-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { NewFilmPageComponent } from './pages/new-film-page/new-film-page.component';
import { WatchedPageComponent } from './pages/watched-page/watched-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'Home' },
  { path: 'watchlist', component: WatchlistPageComponent, title: 'Watchlist' },
  { path: 'watched', component: WatchedPageComponent, title: 'Watched' },
  { path: 'search', component: SearchPageComponent, title: 'Search' },
  { path: 'details/:id', component: DetailsPageComponent, title: 'Details' },
  { path: 'auth/login', component: LoginPageComponent, title: 'Login' },
  { path: 'auth/signup', component: SignupPageComponent, title: 'Signup' },
  { path: 'films/new', component: NewFilmPageComponent, title: 'Add Film' },
];
