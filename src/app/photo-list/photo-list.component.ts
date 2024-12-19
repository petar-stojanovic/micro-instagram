import {Component} from '@angular/core';
import {PhotoService} from '../services/photo.service';
import {Photo} from '../interfaces/photo';

@Component({
  selector: 'app-photo-list',
  imports: [],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.scss'
})
export class PhotoListComponent {
  photos: Photo[] = [];

  constructor(private photoService: PhotoService) {
    this.photoService.photos$.subscribe((photos) => {
      this.photos = photos
      console.log(this.photos)
    })

    this.photoService.loadPhotos();
  }
}
