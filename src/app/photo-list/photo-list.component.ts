import {Component} from '@angular/core';
import {PhotoService} from '../services/photo.service';
import {Photo} from '../interfaces/photo';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-photo-list',
  imports: [
    MatTableModule
  ],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.scss'
})
export class PhotoListComponent {
  photos: Photo[] = [];
  displayedColumns = [
    'id',
    'title',
    'thumbnailUrl',
  ]

  constructor(private photoService: PhotoService) {
    this.photoService.photos$.subscribe((photos) => {
      this.photos = photos
      console.log(this.photos)
    })

    this.photoService.loadPhotos();
  }
}
