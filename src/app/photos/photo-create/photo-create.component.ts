import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PhotoService} from '../../services/photo.service';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../interfaces/album';

@Component({
  selector: 'app-photo-create',
  imports: [ReactiveFormsModule],
  templateUrl: './photo-create.component.html',
  styleUrl: './photo-create.component.scss'
})
export class PhotoCreateComponent implements OnInit {

  form: FormGroup;
  albums: Album[] = [];

  constructor(private fb: FormBuilder, private photoService: PhotoService, private albumService: AlbumService) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      url: ['', [Validators.required]],
      thumbnailUrl: ['', [Validators.required]],
      albumId: ['']
    });

    this.photoService.test().subscribe(it => {
      console.log(it);
    })

  }

  ngOnInit() {
    this.albumService.getAll().subscribe(albums => {
      this.albums = albums;
    });
  }
}
