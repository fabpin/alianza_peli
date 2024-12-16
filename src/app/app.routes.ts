import { Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { DetailComponent } from './components/detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MoviesComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  },
  {
    path: '**',
    component: MoviesComponent
  }
];
