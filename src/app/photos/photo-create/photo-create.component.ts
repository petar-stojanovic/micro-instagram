import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PhotoService} from '../../services/photo.service';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../interfaces/album';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {Photo} from '../../interfaces/photo';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-photo-create',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink],
  templateUrl: './photo-create.component.html',
  styleUrl: './photo-create.component.scss'
})
export class PhotoCreateComponent implements OnInit {

  form: FormGroup;
  albums: Album[] = [];

  constructor(private fb: FormBuilder, private photoService: PhotoService, private albumService: AlbumService, private router: Router, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      url: ['', [Validators.required]],
      thumbnailUrl: ['', [Validators.required]],
      albumId: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.albumService.getAll().subscribe(albums => {
      this.albums = albums;
    });
  }


  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const photo: Photo = this.form.value;
    this.photoService.addPhoto(photo).subscribe((photo) => {
      console.log(photo);
      this.snackBar.open("Photo successfully created", "Close", {
        duration: 2000,
      });
      this.router.navigate(["/"]);
    });
  }
}
