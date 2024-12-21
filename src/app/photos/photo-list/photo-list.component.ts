import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {Photo} from '../../interfaces/photo';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {RouterLink} from '@angular/router';
import {Observable, Subscription, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {SearchComponent} from '../search/search.component';
import {MatSort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-photo-list',
  imports: [
    MatTableModule,
    RouterLink,
    MatSortModule,
    MatProgressSpinner,
    MatButtonModule,
    SearchComponent
  ],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.scss'
})
export class PhotoListComponent implements OnInit, OnDestroy, AfterViewInit {
  // photos$!: Observable<Photo[]>;
  photos: Photo[] | undefined;
  photoSub: Subscription | undefined;

  displayedColumns = [
    'id',
    'title',
    'thumbnailUrl',
  ]
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<Photo> | undefined;

  constructor(private photoService: PhotoService) {
  }


  ngOnInit() {
    this.photoSub = this.photoService.allPhotos$.subscribe((photos) => {
      console.log(photos)
      this.photos = photos;
      this.dataSource = new MatTableDataSource<Photo>(this.photos);
      this.dataSource.sort = this.sort;
    })

    this.photoService.loadPhotos();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    this.photoSub?.unsubscribe();
  }
}
