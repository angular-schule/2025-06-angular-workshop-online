import { Component, inject, input, OnDestroy, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { BookStore } from '../shared/book-store';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { BookActions } from '../store/book.actions';
import { map } from 'rxjs';
import { selectBooks } from '../store/book.selectors';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard, DatePipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage implements OnDestroy {
  #store = inject(Store);

  // protected books = signal<Book[]>([]);
  protected books = this.#store.selectSignal(selectBooks);

  protected myDate = signal(Date.now());
  #dateInterval = setInterval(() => this.myDate.set(Date.now()), 1000);

  #ratingHelper = inject(BookRatingHelper);
  #bookStore = inject(BookStore);


  constructor() {
    this.#store.dispatch(BookActions.loadBooks());

    /*this.#bookStore.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });*/
  }

  doRateUp(book: Book) {
    const ratedBook = this.#ratingHelper.rateUp(book);
    this.#updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.#ratingHelper.rateDown(book);
    this.#updateList(ratedBook);
  }

  doDelete(book: Book) {
    if (!confirm('Buch löschen?')) {
      return;
    }

    this.#bookStore.delete(book.isbn).subscribe(() => {
      // Buchliste neu laden
      // this.#bookStore.getAll().subscribe(receivedBooks => this.books.set(receivedBooks));

      // ODER: Buchliste lokal filtern
      // this.books.update(currentList => currentList.filter(b => b.isbn !== book.isbn));
    });
  }

  #updateList(ratedBook: Book) {
    // [1,2,3,4,5,6].map(e => e * 10); // [10, 20, 30, 40, 50, 60]
    // [1,2,3,4,5,6,7,8].filter(e => e > 5) // [6, 7, 8]

    /*this.books.update(currentList => {
      return currentList.map(b => {
        if (b.isbn === ratedBook.isbn) {
          return ratedBook;
        } else {
          return b;
        }
      })

    });*/
  }

  ngOnDestroy() {
    clearInterval(this.#dateInterval);
  }
}
