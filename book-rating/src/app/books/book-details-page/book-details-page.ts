import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../shared/book';
import { BookStore } from '../shared/book-store';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss'
})
export class BookDetailsPage {
  #route = inject(ActivatedRoute);
  #bookStore = inject(BookStore);
  protected book = signal<Book | undefined>(undefined);

  constructor() {
    // PULL
    // const isbn = this.#route.snapshot.paramMap.get('isbn');

    // PUSH
    // TODO: Verschachtelte Subscriptions vermeiden
    this.#route.paramMap.subscribe(params => {
      const isbn = params.get('isbn');
      if (isbn) {
        this.#bookStore.getSingle(isbn).subscribe(receivedBook => {
          this.book.set(receivedBook);
        });
      }
    });
  }
}
