import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {PhotoService} from '../../services/photo.service';
import {Photo} from '../../interfaces/photo';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteDialog} from '../../shared/confirm-delete-dialog/confirm-delete-dialog';
import {catchError, EMPTY} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-photo-details',
  imports: [MatCardModule, MatButtonModule, MatProgressSpinner, RouterLink],
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.scss'
})
export class PhotoDetailsComponent implements OnInit {

  photo: Photo | undefined;
  readonly dialog = inject(MatDialog);
  error = false;

  constructor(private route: ActivatedRoute, private photoService: PhotoService,
              private router: Router, private snackBar: MatSnackBar) {
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
    const dialog = this.dialog.open(ConfirmDeleteDialog);

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.photoService.deletePhoto(this.photo!.id).subscribe(() => {
          this.snackBar.open("Photo successfully deleted", "Close", {
            duration: 2000,
          });
          this.router.navigate(["/"]);
        });
      }
    })
  }
}
