import {Routes} from '@angular/router';
import {PhotoListComponent} from './photo-list/photo-list.component';
import {PhotoDetailsComponent} from './photo-details/photo-details.component';

export const routes: Routes = [
  {
    path: '',
    component: PhotoListComponent
  },
  {
    path: 'photo/:id',
    component: PhotoDetailsComponent
  },
  {
    path: '**', redirectTo: ''
  }
];
