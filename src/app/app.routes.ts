import {Routes} from '@angular/router';
import {PhotoListComponent} from './photos/photo-list/photo-list.component';
import {PhotoDetailsComponent} from './photos/photo-details/photo-details.component';
import {PhotoCreateComponent} from './photos/photo-create/photo-create.component';

export const routes: Routes = [
  {
    path: '',
    component: PhotoListComponent
  },
  {
    path: 'photo/create',
    component: PhotoCreateComponent,
  },
  {
    path: 'photo/:id/edit',
    component: PhotoCreateComponent
  },
  {
    path: 'photo/:id',
    component: PhotoDetailsComponent
  },
  {
    path: '**', redirectTo: ''
  }
];
