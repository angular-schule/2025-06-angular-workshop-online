import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, map, of, startWith, switchMap } from 'rxjs';
import { BookStore } from '../shared/book-store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-search-page',
  imports: [ReactiveFormsModule],
  templateUrl: './book-search-page.html',
  styleUrl: './book-search-page.scss'
})
export class BookSearchPage {
  #bookStore = inject(BookStore);
  searchControl = new FormControl('', { nonNullable: true });

  protected results = toSignal(this.searchControl.valueChanges.pipe(
    // filter(term => term.length >= 3),
    debounceTime(250),
    switchMap(term => {
      if (term.length >= 3) {
        return this.#bookStore.search(term);
      } else {
        return of([]);
      }
    }),
    // switchMap(term => this.#bookStore.search(term))
  ), { initialValue: [] });
}
