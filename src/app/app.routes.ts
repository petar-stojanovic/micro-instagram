import {Routes} from '@angular/router';
import {AllPhotosComponent} from './all-photos/all-photos.component';

export const routes: Routes = [
  {
    path: '',
    component: AllPhotosComponent
  },
  {
    path: '**', redirectTo: ''
  }
];
