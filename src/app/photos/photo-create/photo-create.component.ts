import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PhotoService} from '../../services/photo.service';
import {AlbumService} from '../../services/album.service';
import {Album} from '../../interfaces/album';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Photo} from '../../interfaces/photo';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, forkJoin, switchMap} from 'rxjs';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-photo-create',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatCardModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink],
  templateUrl: './photo-create.component.html',
  styleUrl: './photo-create.component.scss'
})
export class PhotoCreateComponent implements OnInit {

  form: FormGroup;
  albums: Album[] = [];
  isEditMode = false;
  photoId: number | undefined;
  error = false;

  constructor(private fb: FormBuilder,
              private photoService: PhotoService,
              private albumService: AlbumService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      url: ['', [Validators.required]],
      thumbnailUrl: ['', [Validators.required]],
      albumId: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.isEditMode = !!this.route.snapshot.params["id"];

    if (this.isEditMode) {
      this.photoId = +this.route.snapshot.params["id"];
      this.loadPhotoDetails(this.photoId);
    } else {
      this.albumService.getAll().subscribe(albums => {
        this.albums = albums;
      });
    }
  }


  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const photo: Photo = this.form.value;


    console.log("PHOTO", photo);
    if (this.isEditMode) {
      this.photoService.updatePhoto(this.photoId!, photo).subscribe((photo) => {
        console.log("UPDATE", photo);
        this.snackBar.open("Photo successfully updated", "Close", {
          duration: 2000,
        });
        this.router.navigate(["/photo", photo.id]);
      });

    } else {
      this.photoService.addPhoto(photo).subscribe((photo) => {
        console.log(photo);
        this.snackBar.open("Photo successfully created", "Close", {
          duration: 2000,
        });
        this.router.navigate(["/"]);
      });
    }

  }

  private loadPhotoDetails(photoId: number) {
    forkJoin({
      photo: this.photoService.getPhoto(photoId),
      albums: this.albumService.getAll(),
    })
      .pipe(
        catchError(_ => {
          this.error = true;
          return [];
        })
      )
      .subscribe(({photo, albums}) => {
        this.albums = albums;
        this.form.patchValue(photo);
      });
  }
}
