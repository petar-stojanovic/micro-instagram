import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {Photo} from '../../interfaces/photo';
import {MatTableModule} from '@angular/material/table';
import {RouterLink} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-photo-list',
  imports: [
    MatTableModule,
    RouterLink,
    AsyncPipe,
    MatProgressSpinner,
    MatButtonModule
  ],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.scss'
})
export class PhotoListComponent implements OnInit {
  photos$!: Observable<Photo[]>;

  displayedColumns = [
    'id',
    'title',
    'thumbnailUrl',
  ]

  constructor(private photoService: PhotoService) {
    this.photos$ = this.photoService.photos$.pipe(
      tap(photos => {
        console.log(photos)
      })
    )
  }

  ngOnInit() {
    this.photoService.loadPhotos();
  }
}
