import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStore {

  #http = inject(HttpClient);
  #apiUrl = 'https://api.angular.schule';

  getAll() {
    return this.#http.get<Book[]>(this.#apiUrl + '/books');
  }

  // AUFGABE: diese Methoden implementieren
  getSingle(isbn: string) {}

  create(book: Book) {}

  search(term: string) {}

}
