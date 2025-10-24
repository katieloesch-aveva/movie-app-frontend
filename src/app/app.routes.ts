import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { WatchlistPageComponent } from './pages/watchlist-page/watchlist-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { NewFilmPageComponent } from './pages/new-film-page/new-film-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'Home' },
  { path: 'watchlist', component: WatchlistPageComponent, title: 'Watchlist' },
  { path: 'details/:id', component: DetailsPageComponent, title: 'Details' },
  { path: 'auth/login', component: LoginPageComponent, title: 'Login' },
  { path: 'auth/signup', component: SignupPageComponent, title: 'Signup' },
  { path: 'new-film', component: NewFilmPageComponent, title: 'Add Film' },
];
