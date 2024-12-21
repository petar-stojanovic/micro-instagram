import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  searchControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.searchControl.setValue(this.searchQuery);
    })

    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(query => {
      console.log("query", query);
      this.router.navigate(['/'], {
        queryParams: {query}
      })
    })
  }

}
