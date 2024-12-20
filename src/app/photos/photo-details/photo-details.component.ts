import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {PhotoService} from '../../services/photo.service';
import {Photo} from '../../interfaces/photo';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDeleteDialog} from '../../shared/confirm-delete-dialog/confirm-delete-dialog';

@Component({
  selector: 'app-photo-details',
  imports: [MatCardModule, MatButtonModule, MatProgressSpinner],
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.scss'
})
export class PhotoDetailsComponent implements OnInit {

  photo: Photo | undefined;
  readonly dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute, private photoService: PhotoService) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params)
    const id = +this.route.snapshot.params["id"];
    this.photoService.getPhoto(id).subscribe(photo => {
      console.log(photo);
      this.photo = photo;
    })
  }

  deleteImage() {
    this.dialog.open(ConfirmDeleteDialog, {
      // width: '250px',
    });
  }
}
