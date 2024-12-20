import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {PhotoService} from '../../services/photo.service';
import {Photo} from '../../interfaces/photo';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteDialog} from '../../shared/confirm-delete-dialog/confirm-delete-dialog';
import {catchError, EMPTY} from 'rxjs';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-photo-details',
  imports: [MatCardModule, MatButtonModule, MatProgressSpinner, JsonPipe, RouterLink],
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.scss'
})
export class PhotoDetailsComponent implements OnInit {

  photo: Photo | undefined;
  readonly dialog = inject(MatDialog);
  error = false;

  constructor(private route: ActivatedRoute, private photoService: PhotoService) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params)
    const id = +this.route.snapshot.params["id"];
    this.photoService.getPhoto(id)
      .pipe(
        catchError(err => {
          this.error = true;
          return EMPTY;
        })
      )
      .subscribe(photo => {
        console.log(photo);
        this.photo = photo;
      })
  }

  deleteImage() {
    const dialog = this.dialog.open(ConfirmDeleteDialog, {
      // width: '250px',
    });

    dialog.afterClosed().subscribe(result => {
      console.log("Dialog result: ", result);
      this.photoService.deletePhoto(this.photo!.id).subscribe(() => {
        console.log("Photo deleted");
      });
    })
  }
}
