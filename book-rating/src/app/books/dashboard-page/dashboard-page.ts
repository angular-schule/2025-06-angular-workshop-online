import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage {
  protected books = signal<Book[]>([]);

  constructor() {
    this.books.set([
      {
        isbn: '456',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        price: 42.9,
        rating: 5
      },
      {
        isbn: '789',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        price: 36.9,
        rating: 3
      }
    ])
  }

  doRateUp(book: Book) {
    console.log('UP', book);
  }

  doRateDown(book: Book) {
    console.log('DOWN', book);
  }
}
