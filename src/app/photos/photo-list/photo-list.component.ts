import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {Photo} from '../../interfaces/photo';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {SearchComponent} from '../search/search.component';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-photo-list',
  imports: [
    MatTableModule,
    RouterLink,
    MatSortModule,
    MatProgressSpinner,
    MatButtonModule,
    SearchComponent,
    MatPaginatorModule
  ],
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.scss'
})
export class PhotoListComponent implements OnInit, OnDestroy, AfterViewInit {
  photoSub: Subscription | undefined;

  displayedColumns = [
    'id',
    'title',
    'thumbnailUrl',
  ]

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Photo>([]);

  constructor(private photoService: PhotoService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.photoSub = this.photoService.allPhotos$.subscribe((photos) => {
      this.dataSource.data = (photos);
    })

    this.route.queryParams.subscribe(params => {
      const query = params['query'] || '';
      this.dataSource.filter = query.trim().toLowerCase();
    })

    this.photoService.loadPhotos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  ngOnDestroy() {
    this.photoSub?.unsubscribe();
  }
}
