import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-photo-details',
  imports: [],
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.scss'
})
export class PhotoDetailsComponent {

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      console.log(params);
    });

  }
}
