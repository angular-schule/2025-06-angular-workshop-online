import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-search-page',
  imports: [ReactiveFormsModule],
  templateUrl: './book-search-page.html',
  styleUrl: './book-search-page.scss'
})
export class BookSearchPage {
  searchControl = new FormControl('', { nonNullable: true });

  constructor() {
    this.searchControl.valueChanges.subscribe(e => {
      console.log(e);
    });
  }
}
